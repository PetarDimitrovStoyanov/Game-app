const express = require('express')
const Game = require('../models/Game');
const User = require('../models/User');

const router = new express.Router()

router.get('/', (req, res) => {
  Game.find({}).then((game) => {
    User.find({}).then((users) => {
      return res.status(200).json({
        game: game.length,
        users: users.length
      })
    })
  })
})

module.exports = router
