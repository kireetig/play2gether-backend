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
        placeId: req.body.placeId
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

router.get('/get', checkToken, (req, res, next) => {
    Game.find({"gameDate": {"$gte": req.query.currentDate}}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
                status: 500
            });
        }
        res.status(200).json({
            data: result,
            status: 200
        });
    });
});

router.post('/request', checkToken, (req, res, next) => {
    Game.update({"_id": req.query.gameId, "requests._id": {$ne: req.body._id }}, {$addToSet: {"requests": req.body}}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
                status: 500
            });
        } else {
            res.status(200).json({
                status: 200,
                result: result
            });
        }
    })
});

module.exports = router;