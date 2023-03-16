const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Friend extends Model {}

Friend.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize
});

Friend.belongsTo(User);
User.hasMany(Friend);

module.exports=Friend