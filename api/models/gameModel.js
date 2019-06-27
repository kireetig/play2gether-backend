const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    sportName: {type: String, required: true},
    sportId: {type: String, required: true},
    venue: {type: String, required: true},
    venueAddress: {type: String},
    gameDate: {type: Date, required: true},
    description: {type: String, required: true},
    hostId: {type: String, required: true},
    placeId: {type: String},
    hostName: {type: String},
    requests: [{
        _id: {type: String},
        name: {type: String},
        selfRatingScore: {type: Number},
        userRatingScore: {type: Number}
    }],
    messages: {type: Array}
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;