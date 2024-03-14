import { Table, QueryRunner, MigrationInterface } from 'typeorm';

export class Node1709265450342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nodes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'x',
            type: 'decimal',
          },
          {
            name: 'y',
            type: 'decimal',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'int',
          },
          {
            name: 'flow_id',
            type: 'uuid',
          },
          {
            name: 'node_type_id',
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
            columnNames: ['flow_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'flows',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['node_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'node_types',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nodes');
  }
}
