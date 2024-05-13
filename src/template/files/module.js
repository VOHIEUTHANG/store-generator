import { TEMP_VAR } from "utils/constant";

const Module = `import { Module } from '@nestjs/common';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service } from './{${TEMP_VAR.TABLE_NAME}}.service';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController } from './{${TEMP_VAR.TABLE_NAME}}.admin.controller';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}UserController } from './{${TEMP_VAR.TABLE_NAME}}.user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { {${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}} } from './entities/{${TEMP_VAR.PURE_TABLE_NAME}}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}])],
  controllers: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController, {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}UserController],
  providers: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service],
  exports: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service],
})
export class {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Module {}
`;

export { Module };
