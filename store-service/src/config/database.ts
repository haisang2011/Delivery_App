import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3304,
  username: 'root',
  password: 'root',
  database: 'storedb',
  synchronize: true,
}