const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    sportName: {type: String, required: true},
    sportId: {type: Number, required: true},
    venue: {type: String, required: true},
    venueAddress: {type: String},
    gameDate: {type: Date, required: true},
    description: {type: String, required: true},
    hostId: {type: Number, required: true},
    hostName: {type: String},
    requests: {type: Array},
    messages: {type: Array}
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;