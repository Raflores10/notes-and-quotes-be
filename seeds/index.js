const sequelize = require("../config/connection");
const { User, Genre } = require("../models");

const friendSeeds = require('./genre.json')

const seed = async ()=> {
    await sequelize.sync({force:true});
    
    const users = await User.bulkCreate([
        {
            username:"Kraig",
            email:"Kraig@kraig.kraig",
            password:"password"
        },
        {
            username:"Rickie",
            email:"Rickie@Rickie.Rickie",
            password:"password"
        },
        {
            username:"Johnny",
            email:"Johnny@Johnny.Johnny",
            password:"password"
        },
        {
            username:"Alisa",
            email:"Alisa@Alisa.Alisa",
            password:"password"
        },
        {
            username:"Allie",
            email:"Allie@Allie.Allie",
            password:"password"
        },
        {
            username:"Hannah",
            email:"Hannah@Hannah.Hannah",
            password:"password"
        },
        {
            username:"Richard",
            email:"Richard@Richard.Richard",
            password:"password"
        },
        {
            username:"Sophie",
            email:"Sophie@Sophie.Sophie",
            password:"password"
        },
        {
            username:"Savannah",
            email:"Savannah@Savannah.Savannah",
            password:"password"
        },
        {
            username:"George",
            email:"George@George.George",
            password:"password"
        },
        {
            username:"Steve",
            email:"Steve@Steve.Steve",
            password:"password"
        },
    ],{
        individualHooks:true
    })

    
const friends = await Friend.bulkCreate(friendSeeds);

    await users
}