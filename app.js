const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config = require('./config');
const morgan = require("morgan");
const router = express.Router();

const userRoutes = require('./api/routes/user');
const sportsRoutes = require('./api/routes/sports');

const port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString(), {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

// mongoose.Promise = global.Promise;

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use('/sports', sportsRoutes);

router.get('/', (err, req, res) => {
    res.status(200).json({
        message: 'app is running'
    })
});

app.use((req, res, next) => {
    const error = new Error("No Page found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(port, () => {
    console.log('app is running on port :' + port);
});