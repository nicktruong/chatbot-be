import { Table, QueryRunner, MigrationInterface } from 'typeorm';

export class Flow1709113871290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flows',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'bot_id',
            type: 'uuid',
          },
          {
            name: 'flow_type_id',
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
            columnNames: ['bot_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bots',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['flow_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'flow_types',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('flows');
  }
}
