import { TEMP_VAR } from "utils/constant";

const CreateDto = `import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../@base/dto';

export class Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
`;
const FilterDto = `import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';

import {
  BaseFindAllQueryDto,
  BaseSearchQuery,
} from '@revnology/nestjs-base-crud';

// Standard Searchable Columns
export class SearchQuery extends BaseSearchQuery {
  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly name?: string;
}

// Standard Find Query DTO with PascalCase singular
export class FindAll{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}QueryDto extends BaseFindAllQueryDto {
  @ValidateNested({ each: true })
  @Type(() => SearchQuery)
  @IsObject()
  @IsOptional()
  readonly search?: SearchQuery;
}
`;

const UpdateDto = `import { PartialType } from '@nestjs/swagger';
import { Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto } from './create-{${TEMP_VAR.PURE_TABLE_NAME}}.dto';

export class Update{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto extends PartialType(Create{${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}}Dto) {}
`;

export { CreateDto, UpdateDto, FilterDto };
