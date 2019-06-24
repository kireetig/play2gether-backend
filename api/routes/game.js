const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/check-auth');

const Game = require('../models/sportsModel');

router.post('/host', checkToken, (req, res, next) => {
    const game = new Game({
        ...req.body
    });
    game.save().then(result => {
        res.status(200).json({
            status: 200,
            data: {
                ...req.body
            }
        })
    }).catch(error => {
        res.status(500).json({
            message: error,
            status: 500
        });
    });
});

module.exports = router;