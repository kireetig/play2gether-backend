const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const checkToken = require('../middleware/check-auth');
const User = require('../models/userModel');

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then((result) => {
                        console.log(result);
                        const token = jwt.sign({
                                email: result.email,
                                id: result._id
                            },
                            config.JWT_KEY,
                            {
                                expiresIn: '1h'
                            });
                        res.status(200).json({
                            message: 'User Created',
                            token
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message: error
                        })
                    });
                }
            });
        }
    })

});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Failed',
                status: 401
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        status: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            id: user[0].id
                        },
                        config.JWT_KEY,
                        {
                            expiresIn: '1h'
                        });
                    return res.status(200).json({
                        message: 'Auth Successful',
                        status: 200,
                        token,
                        isProfileComplete: user[0].isProfileComplete
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/getProfile', checkToken, (req, res) => {
    User.findById(req.userData.id).exec().then(user => {
        return res.status(200).json({
            ...user
        });
    })
});

router.delete('/:userId', checkToken, (req, res, next) => {
    User.remove({_id: req.params.userId}).exec().then(result => {
        return res.status(200).json({
            message: 'User is deleted'
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;