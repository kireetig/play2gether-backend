const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportsSchema = new Schema({
    name: {type: String, required: true},
});

const Sports = mongoose.model('Sports', sportsSchema);

module.exports = Sports;