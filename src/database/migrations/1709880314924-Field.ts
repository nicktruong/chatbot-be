import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Field1709880314924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fields',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'card_id',
            type: 'uuid',
          },
          {
            name: 'field_type_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            columnNames: ['card_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cards',
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
    await queryRunner.dropTable('fields');
  }
}
