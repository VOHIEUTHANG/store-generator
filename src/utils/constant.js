export const GENERATE_OPTIONS = {
    CREATE_OR_UPDATE: 1,
    GET_LIST: 2,
    GET_DETAIL: 3,
    DELETE: 4,
};

const DataTypeOptions = [
    {
        value: "varchar",
        label: "varchar",
    },
    {
        value: "nvarchar",
        label: "nvarchar",
    },
    {
        value: "bit",
        label: "bit",
    },
    {
        value: "int",
        label: "int",
    },
    {
        value: "bigint",
        label: "bigint",
    },
    {
        value: "datetime",
        label: "datetime",
    },
    {
        value: "money",
        label: "money",
    },
];

const StoreProcedureOptions = [
    {
        value: GENERATE_OPTIONS.CREATE_OR_UPDATE,
        label: "Create or Update",
    },
    {
        value: GENERATE_OPTIONS.GET_LIST,
        label: "Get List",
    },
    {
        value: GENERATE_OPTIONS.GET_DETAIL,
        label: "Get Detail",
    },
    {
        value: GENERATE_OPTIONS.DELETE,
        label: "Delete",
    },
];

const FormatOptions = [
    {
        label: "Collapsed",
        key: 1,
    },
    {
        label: "Indented",
        key: 2,
    },
];

const SPECIAL_FIELDS = {
    IS_DELETED: "ISDELETED",
    DELETED_DATE: "DELETEDDATE",
    DELETED_USER: "DELETEDUSER",
    UPDATED_USER: "UPDATEDUSER",
    UPDATED_DATE: "UPDATEDDATE",
    CREATED_USER: "CREATEDUSER",
    CREATED_DATE: "CREATEDDATE",
};

export const PREFIX = "AdminWeb";

export {
    DataTypeOptions,
    StoreProcedureOptions,
    FormatOptions,
    SPECIAL_FIELDS,
};
