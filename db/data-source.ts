import dotenv = require('dotenv');
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

console.log(host, port, username, password, database);
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port: Number(port),
  username,
  password,
  database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
