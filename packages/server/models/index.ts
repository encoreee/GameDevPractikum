import { Model, DataTypes } from 'sequelize';
import sequelize from '../app/sequelize';

// Модель для пользователей
class User extends Model {
  public first_name!: string;
  public second_name!: string;
  public login!: string;
  public email!: string;
  // public theme!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    second_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    login: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
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

// Модель для тем
class Theme extends Model {
  public id!: number;
  public name!: string;
}

Theme.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'themes',
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

// User.hasOne(Theme);

// Экспорт моделей
export { User, Topic, Message };
