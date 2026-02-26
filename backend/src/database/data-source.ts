import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import * as path from 'path';
import { Role } from '../users/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

// Load root .env for CLI usage
loadEnv({
  path: path.resolve(process.cwd(), '.env'),
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'tasker',
  synchronize: false,
  entities: [Role, User, Task],
  migrations: [path.join(__dirname, 'migrations/*.js')],
});

export default AppDataSource;

