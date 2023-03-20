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
    username: {
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize
});



module.exports=Friend