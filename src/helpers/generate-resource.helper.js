import JSZip from "jszip";
import { AdminController, ControllerTest, UserController } from "template/files/controller";
import { CreateDto, UpdateDto, FilterDto } from "template/files/dto";
import { Entity } from "template/files/entity";
import { Module } from "template/files/module";
import { Service, ServiceTest } from "template/files/service";
import lodash from "lodash";
import { TEMP_VAR } from "utils/constant";

const _replaceTemplateVariable = (input, nameObject) => {
  return input
    .replaceAll(`{${TEMP_VAR.TABLE_NAME}}`, nameObject.tableName)
    .replaceAll(`{${TEMP_VAR.PURE_TABLE_NAME}}`, nameObject.pureTableName)
    .replaceAll(`{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}`, nameObject.captilizePureTableName)
    .replaceAll(`{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}`, nameObject.captilizeTableName)
    .replaceAll(`{${TEMP_VAR.UPPERCASE_TABLE_NAME}}`, nameObject.uppercasePureTableName);
};

export default function generateResource(tableData) {
  const tableName = tableData.table_name;
  const pureTableName = String(tableData.table_name).slice(0, tableData.table_name.length - 1); // without s
  const captilizeTableName = lodash.capitalize(tableName);
  const captilizePureTableName = lodash.capitalize(pureTableName);
  const uppercasePureTableName = lodash.upperCase(pureTableName);

  const nameObject = {
    tableName,
    pureTableName,
    captilizeTableName,
    captilizePureTableName,
    uppercasePureTableName,
  };

  const adminController = _replaceTemplateVariable(AdminController, nameObject);
  const userController = _replaceTemplateVariable(UserController, nameObject);
  const controllerTest = _replaceTemplateVariable(ControllerTest, nameObject);
  const module = _replaceTemplateVariable(Module, nameObject);
  const service = _replaceTemplateVariable(Service, nameObject);
  const serviceTest = _replaceTemplateVariable(ServiceTest, nameObject);
  const entity = _replaceTemplateVariable(Entity, nameObject);
  const createDto = _replaceTemplateVariable(CreateDto, nameObject);
  const updateDto = _replaceTemplateVariable(UpdateDto, nameObject);
  const filterDto = _replaceTemplateVariable(FilterDto, nameObject);

  // Create a zip folder
  const zip = new JSZip();
  const dtoFolder = zip.folder("dto");
  const entityFolder = zip.folder("entities");
  zip.folder("enums");

  entityFolder.file(`${pureTableName}.entity.ts`, entity);
  dtoFolder.file(`create-${pureTableName}.dto.ts`, createDto);
  dtoFolder.file(`update-${pureTableName}.dto.ts`, updateDto);
  dtoFolder.file(`find-all-${pureTableName}-query.dto.ts`, filterDto);

  // Add TypeScript files to the folder
  zip.file(`${tableName}.admin.controller.ts`, adminController);
  zip.file(`${tableName}.user.controller.ts`, userController);
  zip.file(`${tableName}.controller.spec.ts`, controllerTest);
  zip.file(`${tableName}.module.ts`, module);
  zip.file(`${tableName}.service.ts`, service);
  zip.file(`${tableName}.service.spec.ts`, serviceTest);

  // Generate zip file
  return zip.generateAsync({ type: "blob" });
}
