const { Users } = require('../../database/models');
const createError = require('../createError');


/**
 * 
 * @param {String} username
 * @return {Bool} 
 */
const getGuest = async (username, gender) => {
    console.log(username, ':', gender);
    let user = await Users.findOne({ username, gender });
    if (user) {
        if(user.role != 'guest') {
            throw createError(400, 'Bad Request', 'username is already taken');
        } else {
            return user;
        }
    }
    return null;

};

module.exports = getGuest;
