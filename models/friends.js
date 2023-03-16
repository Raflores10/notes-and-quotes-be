const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Friends extends Model {}

Friends.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
},{
    sequelize
});

module.exports=Friends