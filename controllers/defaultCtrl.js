const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../utils/logger');

const get = (req, res) => {
    logger.info({ message: 'User requested for root' });
    res.status(200);
    res.send('FSA API');
};

const health = async (req, res) => {
    try {
        logger.info({ message: 'User requested for health' });
        await mongoose.connect(config.dbConStr);
        res.status(200);
        res.json({ db: 'Up' });
        logger.info({ message: 'Connected to DB Successfully' });
        mongoose.connection.close();
    } catch (e) {
        logger.error({ message: 'Failed to connect to db', error: e });
        res.status(500);
        res.send('Internal Server Error');
    }

    // mongoose.connect(config.dbConStr)
    //     .then(() => {
    //         res.status(201);
    //         res.json({ db: 'Up' });
    //     })
    //     .catch(err => {
    //         res.status(500);
    //         res.send('Internal Server Error');
    //     });
};

module.exports = { get, health };