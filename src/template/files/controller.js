import { TEMP_VAR } from "utils/constant";

const AdminController = `import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    SerializeOptions,
    Request,
  } from '@nestjs/common';
  import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service } from './{${TEMP_VAR.TABLE_NAME}}.service';
  import { Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto } from './dto/create-{${TEMP_VAR.PURE_TABLE_NAME}}.dto';
  import { Update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto } from './dto/update-{${TEMP_VAR.PURE_TABLE_NAME}}.dto';
  import { successResponse } from '../helper/response';
  import { FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto } from './dto/find-all-{${TEMP_VAR.PURE_TABLE_NAME}}-query.dto';
  import { Roles } from '../decorators/roles.decorator';
  import { Role } from '../auth/enums/role.enum';
  import { ADMIN_GROUP } from '@revnology/nestjs-base-crud';
  
  @Controller('admin/{${TEMP_VAR.TABLE_NAME}}')
  @Roles(Role.ADMIN)
  @SerializeOptions({
    groups: [ADMIN_GROUP],
  })
  export class {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController {
    constructor(private readonly {${TEMP_VAR.TABLE_NAME}}Service: {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service) {}
  
    @Post()
    async create(@Body() create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto: Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto, @Request() req) {
      return successResponse(
        await this.{${TEMP_VAR.TABLE_NAME}}Service.create({
          ...create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto,
          userId: create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto.userId || req.user.user.id,
        }),
        "Create {${TEMP_VAR.PURE_TABLE_NAME}} successfully",
      );
    }
  
    @Get()
    async findAll(@Query() query: FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto) {
      return successResponse(
        await this.{${TEMP_VAR.TABLE_NAME}}Service.findAll(query),
        "Find {${TEMP_VAR.PURE_TABLE_NAME}} successfully",
      );
    }
  
    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string) {
      return successResponse(
        await this.{${TEMP_VAR.TABLE_NAME}}Service.findOneByUuidOrFail(uuid),
        "Get {${TEMP_VAR.PURE_TABLE_NAME}} successfully",
      );
    }
  
    @Patch(':uuid')
    async update(
      @Param('uuid') uuid: string,
      @Body() update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto: Update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto,
      @Request() req,
    ) {
      const {${TEMP_VAR.PURE_TABLE_NAME}} = await this.{${TEMP_VAR.TABLE_NAME}}Service.findOneByUuidOrFail(uuid);
      return successResponse(
        await this.{${TEMP_VAR.TABLE_NAME}}Service.update({${TEMP_VAR.PURE_TABLE_NAME}}.id, {
          ...update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto,
          userId: update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto.userId || req.user.user.id,
        }),
        "Update {${TEMP_VAR.PURE_TABLE_NAME}} successfully",
      );
    }
  
    @Delete(':uuid')
    async remove(@Param('uuid') uuid: string) {
      const {${TEMP_VAR.PURE_TABLE_NAME}} = await this.{${TEMP_VAR.TABLE_NAME}}Service.findOneByUuidOrFail(uuid);
  
      return successResponse(
        await this.{${TEMP_VAR.TABLE_NAME}}Service.remove({${TEMP_VAR.PURE_TABLE_NAME}}.id),
        "Delete {${TEMP_VAR.PURE_TABLE_NAME}} successfully",
      );
    }
  }
  
`;

const ControllerTest = `import { Test, TestingModule } from '@nestjs/testing';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController } from './{${TEMP_VAR.TABLE_NAME}}.admin.controller';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service } from './{${TEMP_VAR.TABLE_NAME}}.service';

describe('{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController', () => {
  let controller: {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController],
      providers: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service],
    }).compile();

    controller = module.get<{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController>({${TEMP_VAR.CAPTILIZE_TABLE_NAME}}AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`;

const UserController = `import { Controller, Get, Param, Query } from '@nestjs/common';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service } from './{${TEMP_VAR.TABLE_NAME}}.service';
import { successResponse } from '../helper/response';
import { FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto } from './dto/find-all-{${TEMP_VAR.PURE_TABLE_NAME}}-query.dto';
import { CheckPermission } from '../decorators/check-permission.decorator';
import { Name } from '../permissions/enums/name.enum';

@Controller('user/{${TEMP_VAR.TABLE_NAME}}')
export class {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}UserController {
  constructor(private readonly {${TEMP_VAR.TABLE_NAME}}Service: {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service) {}

  @CheckPermission(Name.{${TEMP_VAR.UPPERCASE_TABLE_NAME}}_READ)
  @Get()
  async findAll(@Query() query: FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto) {
    return successResponse(
      await this.{${TEMP_VAR.TABLE_NAME}}Service.findAll(query),
      'Find {${TEMP_VAR.PURE_TABLE_NAME}} successfully',
    );
  }

  @CheckPermission(Name.{${TEMP_VAR.UPPERCASE_TABLE_NAME}}_READ)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return successResponse(
      await this.{${TEMP_VAR.TABLE_NAME}}Service.findOneByUuidOrFail(uuid),
      'Get {${TEMP_VAR.PURE_TABLE_NAME}} successfully',
    );
  }
}
`;

export { AdminController, UserController, ControllerTest };
