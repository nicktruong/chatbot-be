import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Message1710312369397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'bot_id',
            type: 'uuid',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'sender',
            type: 'varchar',
          },
          {
            name: 'receiver',
            type: 'varchar',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
