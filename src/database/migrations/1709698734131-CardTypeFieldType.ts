import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CardTypeFieldType1709698734131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_types_field_types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'position',
            type: 'int',
          },
          {
            name: 'card_type_id',
            type: 'uuid',
          },
          {
            name: 'field_type_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            columnNames: ['card_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'card_types',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['field_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'field_types',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card_types_field_types');
  }
}
