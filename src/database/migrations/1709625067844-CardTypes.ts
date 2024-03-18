import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { CardTypeEnum, GroupTypeEnum } from '@/api/card-type/card-type.enum';

export class CardTypes1709625067844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_types',
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
            enum: enumh.getValuesAndToString<typeof CardTypeEnum>(CardTypeEnum),
            enumName: 'card_types_type_enum',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'desc',
            type: 'varchar',
          },
          {
            name: 'group_type',
            type: 'enum',
            enum: enumh.getValuesAndToString<typeof GroupTypeEnum>(
              GroupTypeEnum,
            ),
            enumName: 'card_types_group_type_enum',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card_types');
    await queryRunner.query(`
      DROP TYPE card_types_type_enum;
      DROP TYPE card_types_group_type_enum;
    `);
  }
}
