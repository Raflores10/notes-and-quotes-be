const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // foreign keys
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Friend',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'note',
  }
);

module.exports = Note;