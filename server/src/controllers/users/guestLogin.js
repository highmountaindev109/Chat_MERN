const {
    getGuest,
    createUser,
    createToken
} = require('../../utils');
  
const guestLogin = async (req, res, next) => {
    const { nickname, gender } = req.body;
    try {
        let user = await getGuest(nickname, gender);
        if(!user)
            user = await createUser({ username: nickname, role: 'guest', gender });
            console.log('created token')
        const token = await createToken(user._id, user.role);
        console.log('created token', token)

        res
            .cookie('token', token)
            .status(200)
            .json({ statusCode: 200, message: 'login with guest successfully' });
    } catch (err) {
        next(err);
    }
};
  
module.exports = guestLogin;
  