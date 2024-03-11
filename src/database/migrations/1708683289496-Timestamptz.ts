import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Timestamptz1708683289496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('customers', [
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
    ]);

    await queryRunner.changeColumns('admins', [
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
    ]);

    await queryRunner.changeColumns('tokens', [
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
    ]);

    await queryRunner.changeColumns('bots', [
      {
        oldColumn: new TableColumn({
          name: 'publish_date',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'publish_date',
          type: 'timestamptz',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
        }),
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('customers', [
      {
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
        }),
      },
    ]);

    await queryRunner.changeColumns('admins', [
      {
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
        }),
      },
    ]);

    await queryRunner.changeColumns('tokens', [
      {
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
        }),
      },
    ]);

    await queryRunner.changeColumns('bots', [
      {
        newColumn: new TableColumn({
          name: 'publish_date',
          type: 'timestamp',
          isNullable: true,
        }),
        oldColumn: new TableColumn({
          name: 'publish_date',
          type: 'timestamptz',
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'created_at',
          type: 'timestamptz',
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: `('now'::text)::timestamp(6) with time zone`,
        }),
        oldColumn: new TableColumn({
          name: 'updated_at',
          type: 'timestamptz',
        }),
      },
    ]);
  }
}
