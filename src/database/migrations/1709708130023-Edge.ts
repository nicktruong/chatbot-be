import { Table, QueryRunner, TableUnique, MigrationInterface } from 'typeorm';

export class Edge1709708130023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'edges',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'card_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'source_node_id',
            type: 'uuid',
          },
          {
            name: 'target_node_id',
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
            columnNames: ['source_node_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nodes',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['target_node_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'nodes',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'edges',
      new TableUnique({
        columnNames: ['card_id', 'source_node_id', 'target_node_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('edges');
  }
}
