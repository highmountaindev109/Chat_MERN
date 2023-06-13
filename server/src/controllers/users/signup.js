const {
  validateSignUpData,
  isNewEmail,
  isNewUsername,
  createUser,
} = require('../../utils');

const signup = async (req, res, next) => {
  const { username, email, password, gender } = req.body;
  console.log(gender);
  try {
    await validateSignUpData({ username, email, password, gender });
    await isNewUsername(username);
    await isNewEmail(email);
    await createUser({ username, email, password, role: 'user', gender });

    res
      .status(201)
      .json({ statusCode: 201, message: 'signed up successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
