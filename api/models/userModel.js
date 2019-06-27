const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: {type: String},
    country: {type: String},
    password: {type: String, required: true, select: false},
    isProfileComplete: {type: Boolean, default: false},
    favSports: [{
        name: {type: String},
        _id: {type: String},
        selfRatingScore: {type: Number, default: 0},
        userRatingScore: {type: Number, default: 0}
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;