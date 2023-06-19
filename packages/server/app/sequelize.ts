import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: '192.168.100.40',
  port: 5432,
  username: 'postgre',
  password: 'postgre',
  database: 'forumDb',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
