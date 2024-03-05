import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Edge1709563161031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'edges',
        columns: [
          {
            name: 'source_node_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'target_node_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('edges');
  }
}
