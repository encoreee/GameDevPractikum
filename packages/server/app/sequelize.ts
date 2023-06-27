import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
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

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
