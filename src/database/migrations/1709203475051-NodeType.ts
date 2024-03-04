import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { NodeTypeEnum } from '@/api/node-type/enums';

export class NodeType1709203475051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'node_types',
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
            enum: enumh.getValuesAndToString<typeof NodeTypeEnum>(NodeTypeEnum),
            enumName: 'node_types_type_enum',
          },
          {
            name: 'desc',
            type: 'varchar',
          },
          {
            name: 'default_x',
            type: 'decimal',
          },
          {
            name: 'default_y',
            type: 'decimal',
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
    await queryRunner.dropTable('node_types');
    await queryRunner.query('DROP TYPE node_types_type_enum');
  }
}
