import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'eCLLQZYsM9&',
  database: 'postgres',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
