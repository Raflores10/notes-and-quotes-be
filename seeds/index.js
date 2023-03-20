const sequelize = require('../config/connection')
const { User, Friend, Note } = require('../models')

// const noteSeeds = require('./notes.json')

const seed = async () => {

  await sequelize.sync({ force: false })
  
  const users = await User.bulkCreate(
    [
      {
        username: 'Kraig',
        email: 'Kraig@kraig.kraig',
        password: 'password1',
      },
      {
        username: 'Rickie',
        email: 'Rickie@Rickie.Rickie',
        password: 'password1',
      },
      {
        username: 'Johnny',
        email: 'Johnny@Johnny.Johnny',
        password: 'password1',
      },
      {
        username: 'Alisa',
        email: 'Alisa@Alisa.Alisa',
        password: 'password1',
      },
      {
        username: 'Allie',
        email: 'Allie@Allie.Allie',
        password: 'password1',
      },
      {
        username: 'Hannah',
        email: 'Hannah@Hannah.Hannah',
        password: 'password1',
      },
      {
        username: 'Richard',
        email: 'Richard@Richard.Richard',
        password: 'password1',
      },
      {
        username: 'Sophie',
        email: 'Sophie@Sophie.Sophie',
        password: 'password1',
      },
      {
        username: 'Savannah',
        email: 'Savannah@Savannah.Savannah',
        password: 'password1',
      },
      {
        username: 'George',
        email: 'George@George.George',
        password: 'password1',
      },
      {
        username: 'Steve',
        email: 'Steve@Steve.Steve',
        password: 'password1',
      },
    ],
    {
      individualHooks: true,
    },
  )

  const friends = await Friend.bulkCreate(
    [
      {
        id: 1,
        username: 'Steve',
      },
      {
        id: 2,
        username: 'George',
      },
      {
        id: 3,
        username: 'Savannah',
      },
      {
        id: 4,
        username: 'Sophie',
      },
      {
        id: 5,
        username: 'Richard',
      },
      {
        id: 6,
        username: 'Hannah',
      },
      {
        id: 7,
        username: 'Allie',
      },
      {
        id: 8,
        username: 'Alisa',
      },
    ],
    {
      individualHooks: true,
    },
  )
}

  

seed();
