// const express = require('express');
// const Friend = require('../models/friend');
// const User = require('../models/user');
// const Note = require('../models/note');
// const router = express.Router()
// const express = require('express');
// const { User, Friend, Note } = require('../models');

// // Create a new note and associate it with a friend and a user
// router.post('/', async (req, res) => {
//   const { title, body, userId, friendId } = req.body;
//   try {
//     const user = await User.findByPk(userId);
//     const friend = await Friend.findByPk(friendId);
//     if (!user || !friend) {
//       return res.status(404).json({ message: 'User or friend not found' });
//     }
//     const note = await Note.create({ title, body });
//     await note.setUser(user);
//     await note.setFriend(friend);
//     res.status(201).json(note);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all notes associated with a specific friend
// router.get('/:friendId', async (req, res) => {
//   const { friendId } = req.params;
//   try {
//     const friend = await Friend.findByPk(friendId, {
//       include: [
//         {
//           model: Note,
//           include: [{ model: User }],
//         },
//       ],
//     });
//     if (!friend) {
//       return res.status(404).json({ message: 'Friend not found' });
//     }
//     res.json(friend.Notes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update an existing note
// router.put('/:noteId', async (req, res) => {
//   const { title, body } = req.body;
//   const { noteId } = req.params;
//   try {
//     const note = await Note.findByPk(noteId);
//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }
//     await note.update({ title, body });
//     res.json(note);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete an existing note
// router.delete('/:noteId', async (req, res) => {
//   const { noteId } = req.params;
//   try {
//     const note = await Note.findByPk(noteId);
//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }
//     await note.destroy();
//     res.json({ message: 'Note deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




// module.exports = router