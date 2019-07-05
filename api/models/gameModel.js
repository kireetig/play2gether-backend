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
        selfRatingScore: {type: Number, default: null},
        userRatingScore: {type: Number, default: null},
        messages: {type: String},
        isAccepted: {type: Boolean, default: false}
    }],
    messages: [{
        message: {type: String},
        senderName: {type: String},
        timestamp: {type: Date}
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;