const express = require('express')
const Friend = require('../models/friend')
const User = require('../models/user')
const Note = require('../models/note')

const router = express.Router()

// Get all friends
router.get('/', (req, res) => {
  Friend.findAll({
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

// Get a single friend
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const friend = await Friend.findByPk(id, {
      
    })
    if (!friend) {
      res.status(404).json({ message: 'Friend not found' })
    } else {
      res.json(friend)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create a friend
router.post('/', async (req, res) => {
  const { username, userId } = req.body;
  try {
    if (!username) {
      throw new Error('Username is required');
    }

    const friend = await Friend.create({ username, userId });
    res.json(friend);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a friend
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const friend = await Friend.findByPk(id)
    if (!friend) {
      res.status(404).json({ message: 'Friend not found' })
    } else {
      friend.name = name
      await friend.save()
      res.json(friend)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete a friend
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const friend = await Friend.findByPk(id)
    if (!friend) {
      res.status(404).json({ message: 'Friend not found' })
    } else {
      await friend.destroy()
      res.json({ message: 'Friend deleted successfully' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
