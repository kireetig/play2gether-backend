const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/check-auth');

const Game = require('../models/gameModel');

router.post('/host', checkToken, (req, res, next) => {
    const game = new Game({
        sportName: req.body.sportName,
        sportId: req.body.sportId,
        venue: req.body.venue,
        venueAddress: req.body.venueAddress,
        gameDate: req.body.gameDate,
        description: req.body.description,
        hostId: req.body.hostId,
        hostName: req.body.hostName,
    });
    game.save().then(result => {
        res.status(200).json({
            status: 200,
            data: result
        })
    }).catch(error => {
        res.status(500).json({
            error,
            status: 500
        });
    });
});

module.exports = router;