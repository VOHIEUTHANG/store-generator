import { TEMP_VAR } from "utils/constant";

const Entity = `import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@revnology/nestjs-base-crud';

@Entity({ name: '{${TEMP_VAR.TABLE_NAME}}' })
export class {${TEMP_VAR.CAPTILIZE_PURE_TABLE_NAME}} extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;
}
`;

export { Entity };
