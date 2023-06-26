import { Model, DataTypes } from 'sequelize';
import sequelize from '../app/sequelize';

// Модель для пользователей
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

// Модель для тем форума
class Topic extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'topics',
    sequelize,
  }
);

// Модель для сообщений на форуме
class Message extends Model {
  public id!: number;
  public content!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'messages',
    sequelize,
  }
);

// Связи между моделями
User.hasMany(Topic);
Topic.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User);

Topic.hasMany(Message);
Message.belongsTo(Topic);

// Экспорт моделей
export { User, Topic, Message };
