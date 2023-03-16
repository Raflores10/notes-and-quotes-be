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
        as: 'Friend',
      },
      {
        model: Note,
        as: 'Note',
      },
    ],
  })
    .then((usersArr) => {
      res.json(usersArr)
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
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  })
    .then((newUser) => {
      const token = jwt.sign(
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
      email: req.body.email,
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
          expiresIn: '4h',
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
        as: 'Friend',
      },
      {
        model: Note,
        as: 'Note',
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
