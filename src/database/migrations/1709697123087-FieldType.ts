import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { FieldTypeEnum } from '@/api/field-type/field-type.enum';

export class FieldType1709697123087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'field_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'enum',
            isUnique: true,
            enum: enumh.getValuesAndToString<typeof FieldTypeEnum>(
              FieldTypeEnum,
            ),
            enumName: 'field_types_type_enum',
          },
          {
            name: 'question',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('field_types');
    await queryRunner.query('DROP TYPE field_types_type_enum');
  }
}
