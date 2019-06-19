module.exports = (res, err) => {
    return res.status(500).json({
        error: err,
        status: 500
    });
};