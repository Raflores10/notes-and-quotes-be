const express = require('express');
const router = express.Router();



const userRoutes = require("./userController.js");
router.use("/api/users",userRoutes);

const friendRoutes = require("./friendController.js");
router.use("/api/friends",friendRoutes);

const spotifyRoutes = require("./spotifyController.js");
router.use("/api/spotify",spotifyRoutes);

// const noteRoutes = require("./noteController.js");
// router.use("/api/notes",noteRoutes);




module.exports = router;