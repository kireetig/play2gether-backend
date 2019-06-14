const express = require('express');
const router = express.Router();

const Sports = require('../models/sportsModel');

router.get('/get', (req, res, next) => {
    Sports.find((err, result) => {
        if (err) throw err;
        res.status(200).json({
            data: result
        });
    });
    next();
});

module.exports = router;