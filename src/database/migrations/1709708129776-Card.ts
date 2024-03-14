import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Card1709708129776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
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
            name: 'node_id',
            type: 'uuid',
          },
          {
            name: 'card_type_id',
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
            columnNames: ['node_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nodes',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['card_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'card_types',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards');
  }
}
