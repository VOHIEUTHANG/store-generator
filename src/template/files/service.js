import { TEMP_VAR } from "utils/constant";

const Service = `import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto } from './dto/create-{${TEMP_VAR.PURE_TABLE_NAME}}.dto';
  import { Update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto } from './dto/update-{${TEMP_VAR.PURE_TABLE_NAME}}.dto';
  import { {${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}} } from './entities/{${TEMP_VAR.PURE_TABLE_NAME}}.entity';
  import { FindOptionsWhere, ILike, Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto } from './dto/find-all-{${TEMP_VAR.PURE_TABLE_NAME}}-query.dto';
  import { BaseService } from '@revnology/nestjs-base-crud';
  
  @Injectable()
  export class {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service extends BaseService<{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}> {
    protected uniqueColumns = ['name'];
    constructor(
      @InjectRepository({${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}})
      private {${TEMP_VAR.TABLE_NAME}}Repository: Repository<{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}>,
    ) {
      super({${TEMP_VAR.TABLE_NAME}}Repository);
    }
  
    async create(create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto: Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto) {
      const { userId, ...insertDto } = create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto;
      try {
        return await super.create({
          ...insertDto,
          createdBy: userId,
        });
      } catch (error) {
        throw new UnprocessableEntityException(error.message);
      }
    }
  
    async findAll(query: FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto) {
      const searchName: string = query.search?.name;
      const searchDescription: string = query.search?.description;
  
      const where: FindOptionsWhere<{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}> = {};
  
      if (searchName) {
        where.name = ILike('%' + searchName + '%');
      }
      if (searchDescription) {
        where.name = ILike('%' + searchDescription + '%');
      }
      return super.findAll(query);
    }
  
    async findOne(id: number) {
      return super.findOneById(id);
    }
  
    async findOneOrFail(id: number) {
      try {
        return await super.findOneByIdOrFail(id);
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async findOneByUuid(uuid: string) {
      return super.findOneByUuid(uuid);
    }
  
    async findOneByUuidOrFail(uuid: string) {
      try {
        return await super.findOneByUuidOrFail(uuid);
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }
  
    async update(id: number, update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto: Update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto) {
      const { userId, ...updateDto } = update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto;
  
      try {
        return await super.update(id, {
          ...updateDto,
          updatedBy: userId,
        });
      } catch (error) {
        throw new UnprocessableEntityException(error.message);
      }
    }
  
    async remove(id: number) {
      return super.remove(id);
    }
  }
`;

const ServiceTest = `import { Test, TestingModule } from '@nestjs/testing';
import { {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service } from './{${TEMP_VAR.TABLE_NAME}}.service';

describe('{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service', () => {
  let service: {${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service],
    }).compile();

    service = module.get<{${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service>({${TEMP_VAR.CAPTILIZE_TABLE_NAME}}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

`;

export { Service, ServiceTest };
