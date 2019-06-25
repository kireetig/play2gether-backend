const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/check-auth');

const Game = require('../models/sportsModel');

router.post('/host', checkToken, (req, res, next) => {
    const body = {
        ...req.body
    };
    console.log(body);
    const game = new Game(body);
    game.save().then(result => {
        res.status(200).json({
            status: 200,
            data: {
                ...req.body
            }
        })
    }).catch(error => {
        res.status(500).json({
            error,
            status: 500
        });
    });
});

module.exports = router;