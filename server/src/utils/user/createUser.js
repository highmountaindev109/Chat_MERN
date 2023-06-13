const bcrypt = require('bcrypt');

const { Users } = require('../../database/models');

const createUser = async ({ username, email, password, role, gender }) => {
    let hashedPassword = null;
    if(password)
        hashedPassword = await bcrypt.hash(password, 10);
    let user = await Users.create({ username, email, password: hashedPassword, role, gender });
    return user;
};

module.exports = createUser;
