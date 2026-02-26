import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1710000000000 implements MigrationInterface {
  name = 'InitSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        role_id INTEGER REFERENCES roles(id) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TYPE task_status_enum AS ENUM ('PENDING', 'COMPLETED');
    `);

    await queryRunner.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status task_status_enum NOT NULL DEFAULT 'PENDING',
        assigned_user_id INTEGER REFERENCES users(id),
        created_by_id INTEGER REFERENCES users(id)
      );
    `);

    await queryRunner.manager.insert('roles', [
      { name: 'TASKER' },
      { name: 'ADMIN' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tasks;`);
    await queryRunner.query(`DROP TYPE task_status_enum;`);
    await queryRunner.query(`DROP TABLE users;`);
    await queryRunner.query(`DROP TABLE roles;`);
  }
}

