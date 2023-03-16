const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model {}

Notes.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
},{
    sequelize
});

module.exports=Notes