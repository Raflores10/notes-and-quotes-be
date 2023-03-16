const express = require('express');
const router = express.Router();

const usersRoutes = require("./usersController.js");
router.use("/api/users",usersRoutes);

const friendsRoutes = require("./friendsController");
router.use("/api/genres",friendsRoutes);

const notesRoutes = require("./notesController");
router.use("/api/spotify",notesRoutes);




module.exports = router;