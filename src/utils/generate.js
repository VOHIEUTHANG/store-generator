import { PREFIX, SPECIAL_FIELDS } from "./constant";
import {
    checkHaveIsDeleteField,
    extractTableData,
    genInputParams,
} from "./helper";

class GenerateSP {
    constructor(table, prefix = PREFIX) {
        this.table = extractTableData(table);
        this.prefix = prefix;
        this.PR = this.table.selected_primary_key;
    }
    delete(input = []) {
        const tableName = this.table.table_name;

        if (this.PR) {
            input.push(this.PR);
        }
        if (this.table.deleted_user_field) {
            input.push(this.table.deleted_user_field);
        }

        return `
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[${tableName}_DeleteById_${this.prefix}] 
            ${genInputParams(input)}
        AS
            BEGIN
            ${
                this.table.is_deleted_field
                    ? `UPDATE ${tableName} 
                    SET ISDELETED = 1
                    ${
                        this.table.deleted_user_field
                            ? ",DELETEDUSER = @DELETEDUSER"
                            : ""
                    }
                    ${
                        this.table.deleted_date_field
                            ? ",DELETEDDATE = getDate()"
                            : ""
                    }
                    WHERE ${this.PR.field_name} = @${this.PR.field_name}`
                    : `DELETE FROM ${tableName} WHERE ${this.PR.field_name} = @${this.PR.field_name}`
            }
            SELECT 1 AS RESULT
            END
        GO
        `;
    }
    createOrUpdate() {
        const tableName = this.table.table_name;
        const primaryKey = this.PR;

        const inputParams = this.table.field_list
            .filter((field) => {
                return (
                    !Object.values(SPECIAL_FIELDS).includes(field.field_name) ||
                    field.field_name === SPECIAL_FIELDS.CREATED_USER
                );
            })
            .filter((field) => {
                return field.field_name !== primaryKey.field_name;
            });

        return `
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[${tableName}_CreateOrUpdate_${this.prefix}]
            ${genInputParams(inputParams)}
        AS
        BEGIN
            IF NOT EXISTS (SELECT TOP 1 1 FROM ${tableName} WHERE ${
            this.PR.field_name
        } = @${this.PR.field_name} ${
            this.table.is_deleted_field
                ? `AND ${this.table.is_deleted_field.field_name} = 0`
                : ""
        })
        BEGIN 
        INSERT INTO dbo.${tableName} 
        (${inputParams.map((field) => field.field_name).join(",")} ${
            this.table.created_date_field
                ? `,${this.table.created_date_field.field_name}`
                : ""
        })
                VALUES  (${inputParams
                    .map((field) => `@${field.field_name}`)
                    .join(",")} ${
            this.table.created_date_field ? ", getDate()" : ""
        });
            SET @${this.PR.field_name} = SCOPE_IDENTITY()
            SELECT @${this.PR.field_name} AS RESULT
        END 
        ELSE 
        BEGIN 
            UPDATE dbo.${tableName}
            SET ${inputParams
                .filter(
                    (field) => field.field_name !== SPECIAL_FIELDS.CREATED_USER
                )
                .map(
                    (field) =>
                        `${field.field_name} = ISNULL(@${field.field_name}, ${field.field_name})`
                )
                .join(",")} 
                ${
                    this.table.updated_user_field
                        ? `,${this.table.updated_user_field.field_name} = ISNULL(@${this.table.created_user_field.field_name}, ${this.table.updated_user_field.field_name})`
                        : ""
                }
                ${
                    this.table.updated_date_field
                        ? `,${this.table.updated_date_field.field_name} = getDate()`
                        : ""
                }
            WHERE ${this.PR.field_name} = @${this.PR.field_name}
            SELECT @${this.PR.field_name} AS RESULT 
        END
        END
        GO
        `;
    }
    getDetail(fields = this.table.field_list.map((field) => field.field_name)) {
        return `
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[${this.table.table_name}_GetById_${
            this.prefix
        }] @${this.PR.field_name} ${this.PR.type}
        AS
        BEGIN
            SET NOCOUNT ON;
            SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
            SELECT 
                ${this.table.field_list
                    .filter((field) =>
                        fields?.length > 0
                            ? fields.includes(field.field_name)
                            : true
                    )
                    ?.map(
                        (field) =>
                            `${this.table.table_name}.${field.field_name}`
                    )
                    ?.join(",")}
            FROM dbo.${this.table.field}
            WHERE ${this.PR.field_name} = @${this.PR.field_name}
            ${
                this.table.is_deleted_field
                    ? `AND ${this.table.table_name}.${this.table.is_deleted_field.field_name} = 0`
                    : ""
            }
            
        END
        GO

        `;
    }
    getList(fields = this.table.field_list.map((field) => field.field_name)) {
        const selectedFields = this.table.field_list.filter((field) =>
            fields.includes(field.field_name)
        );

        const searchFields = this.table.field_list.filter(
            (field) =>
                field.field_name.includes("name") ||
                field.field_name.includes("code")
        );

        return `
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[${this.table.table_name}_GetList_${this.prefix}]
            @PAGESIZE INT = 25,
            @PAGEINDEX INT = 1,
            @KEYWORD NVARCHAR(250) = NULL,
        AS BEGIN
            SET @KEYWORD = LTRIM(RTRIM(@KEYWORD));
            IF @KEYWORD ='' SET @KEYWORD = NULL;

            SELECT
                ${selectedFields
                    .map((field) => {
                        if (field.data_type === "datetime") {
                            return `FORMAT(${this.table.table_name}.${field.field_name}, 'DD/MM/YYYY') AS ${field.field_name}`;
                        } else if (
                            field.field_name === SPECIAL_FIELDS.CREATED_USER
                        ) {
                            return `IIF(${this.table.table_name}.${this.table.created_user_field.field_name} = 'administrator', SYS_USER.FULLNAME, SYS_USER.USERNAME + '-' + SYS_USER.FULLNAME ) AS ${this.table.created_user_field.field_name}`;
                        }
                        return `${this.table.table_name}.${field.field_name}`;
                    })
                    .join(",")}
            FROM ${this.table.table_name}
            ${
                this.table.created_user_field
                    ? `LEFT JOIN SYS_USER 
                    ON ${this.table.table_name}.${this.table.created_user_field.field_name} = SYS_USER.USERNAME`
                    : ""
            }
            WHERE (@KEYWORD IS NULL OR (
                ${searchFields
                    ?.map(
                        (field) =>
                            `${this.table.table_name}.${field.field_name} LIKE '%' + @KEYWORD + '%' collate Latin1_General_CI_AI_WS`
                    )
                    ?.join(" OR ")}
            ${
                this.table.is_deleted_field
                    ? `${this.table.is_deleted_field.field_name} = 0`
                    : ""
            } 
            ${
                this.table.created_date_field
                    ? `ORDER BY ${this.table.table_name}.${this.table.created_date_field.field_name} DESC`
                    : ""
            }

            OFFSET (@PAGEINDEX -1) * @PAGESIZE ROWS
            FETCH NEXT @PAGESIZE ROWS ONLY

        END
        GO
        `;
    }
}

export default GenerateSP;
