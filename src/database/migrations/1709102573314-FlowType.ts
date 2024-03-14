import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { FlowTypeEnum } from '@/api/flow-type/enums';

export class FlowType1709102573314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flow_types',
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
            enum: enumh.getValuesAndToString<typeof FlowTypeEnum>(FlowTypeEnum),
            enumName: 'flow_types_type_enum',
            default: `'MAIN'::flow_types_type_enum`,
          },
          {
            name: 'desc',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('flow_types');
    await queryRunner.query('DROP TYPE flow_types_type_enum');
  }
}
