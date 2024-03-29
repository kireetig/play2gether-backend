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
    Game.update({
        "_id": req.query.gameId,
        "requests._id": {$ne: req.body._id}
    }, {$addToSet: {"requests": req.body}}, (err, result) => {
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

router.post('/unrequest', checkToken, (req, res, next) => {
    Game.update({"_id": req.query.gameId}, {$pull: {"requests": {"_id": req.body._id}}}, (err, result) => {
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

router.get('/message', checkToken, (req, res, next) => {
    if (req.query.gameId && req.query.userId) {
        Game.findOne({"_id": req.query.gameId}, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err,
                    status: 500
                });
            } else {
                res.status(200).json({
                    status: 200,
                    result: result.messages || []
                });
            }
        })
    } else {
        res.status(403).json({
            error: 'Bad Request, userId or gameId is missing',
            status: 500
        });
    }
});

router.post('/toggleAccept', checkToken, (req, res, next) => {
    Game.findOneAndUpdate({"_id": req.query.gameId, "requests._id": req.body._id},
        {$set: {"requests.$.isAccepted": req.body.isAccepted}}, {"new": true, "upsert": true}, (err, result) => {
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

router.delete('/delete', checkToken, (req, res, next) => {
    Game.deleteOne({"_id": req.query.gameId}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
                status: 500
            });
        } else {
            res.status(200).json({
                status: 200,
                result: 'Delete Successful'
            });
        }
    })
});

module.exports = router;