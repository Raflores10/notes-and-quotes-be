const express = require('express')
const router = express.Router()
const { User, Friend, Note } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.use(express.json())

//Get all users and assoc. friends/notes
router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Friend,
        as: 'Friends',
      },

    ],
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        msg: 'Something went wrong',
        err,
      })
    })
})

//signup
router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((newUser) => {
      const token = jwt.sign(
        (console.log(token)),
        {
          username: newUser.username,
          id: newUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '4h',
        },
      )
      res.json({
        token,
        user: newUser,
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({ msg: 'An error has occurred', err })
    })
})

//Login route
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ msg: 'Invalid login credentials' })
      }
      const token = jwt.sign(
        {
          username: foundUser.username,
          id: foundUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        },
      )
      res.json({
        token,
        user: foundUser,
      })
    })
    .catch((err) => {
      console.log(err)
      res.json({ msg: 'An error has occurred' })
    })
})



router.get('/isValidToken', (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return res
      .status(403)
      .json({ isValid: false, msg: 'You must be logged in' })
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    res.json({
      isValid: true,
      user: tokenData,
    })
  } catch (err) {
    res.status(403).json({
      isValid: false,
      msg: 'Invalid token',
    })
  }
})

//get one with friends/notes
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Friend,
        as: 'Friends',
      },

    ],
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        msg: 'Something went wrong',
        err,
      })
    })
})

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
