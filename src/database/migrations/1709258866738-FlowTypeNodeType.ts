import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FlowTypeNodeType1709258866738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flow_types_node_types_node_types',
        columns: [
          {
            name: 'flow_types_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'node_types_id',
            type: 'uuid',
            isPrimary: true,
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
    await queryRunner.dropTable('flow_types_node_types_node_types');
  }
}
