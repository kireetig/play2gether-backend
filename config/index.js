const config = require('./config');

module.exports = {
    getDbConnectionString: () => {
        return `mongodb+srv://kireeti:${config.pwd}@play2gether-wwo9t.mongodb.net/test?retryWrites=true`
    }
};