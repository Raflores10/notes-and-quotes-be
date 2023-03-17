const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Friend = require('./Friend');


class Note extends Model {}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    text: {
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize
});


module.exports=Note