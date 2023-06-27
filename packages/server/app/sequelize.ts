import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'eCLLQZYsM9&',
  database: 'postgres',
  dialect: 'postgres',
};

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env;

// const sequelizeOptions: SequelizeOptions = {
//   host: 'localhost',
//   port: Number.parseInt(POSTGRES_PORT ?? '5432'),
//   username: POSTGRES_USER,
//   password: POSTGRES_PASSWORD,
//   database: POSTGRES_DB,
//   dialect: 'postgres',
// };

=======
import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} from '../const/env';

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number.parseInt(POSTGRES_PORT ?? '5432'),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

>>>>>>> origin/sprint_4
const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
