import { SPECIAL_FIELDS } from "./constant";

const handleDataType = (field, defaultSize = 255) => {
  const size = field.size || defaultSize;
  if (["varchar", "nvarchar"].includes(field.data_type)) {
    return `${field.data_type}(${size})`;
  }
  return field.data_type;
};

const genInputParams = (params) => {
  return params
    .map((field) => {
      return `@${field.field_name} ${handleDataType(field)} = NULL`;
    })
    .join(",");
};

const checkHaveIsDeleteField = (fields) => {
  return fields.some((field) => field.field_name === "ISDELETED");
};

const checkHaveDeletedUser = (fields) => {
  return fields.some((field) => field.field_name === "DELETEDUSER");
};

const extractTableData = (tableData) => {
  const fieldList = tableData.field_list;
  tableData.selected_primary_key = fieldList.find((field) => field.primary_key);
  tableData.primary_key_list = fieldList.filter((field) => field.primary_key);
  tableData.primary_key_count = tableData.primary_key_list.count;

  tableData.is_deleted_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.IS_DELETED
  );
  tableData.created_user_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.CREATED_USER
  );
  tableData.created_date_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.CREATED_DATE
  );
  tableData.updated_user_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.UPDATED_USER
  );
  tableData.updated_date_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.UPDATED_DATE
  );
  tableData.deleted_user_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.DELETED_USER
  );
  tableData.deleted_date_field = fieldList.find(
    (field) => field.field_name === SPECIAL_FIELDS.DELETED_DATE
  );

  fieldList.forEach((field) => {
    field.type = handleDataType(field);
  });

  return tableData;
};

export {
  handleDataType,
  checkHaveIsDeleteField,
  checkHaveDeletedUser,
  genInputParams,
  extractTableData,
};
