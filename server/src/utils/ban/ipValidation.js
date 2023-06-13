const createError = require('../createError');
const isIp = require('is-ip');

const validateIP = async (ip) => {
    if(!isIp.v4(ip)) {
        throw createError(400, 'Bad request' ,'Invalid ip address.');
    }
};

module.exports = validateIP;
