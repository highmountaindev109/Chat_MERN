const { validateRoomName, isNewRoom, createRoom } = require('../../utils');

const addRoom = async (req, res, next) => {
  try {

    const { name, category, description, welcomeMessage, password } = req.body;
    const user = req.userData;

    let user_id = user._id;

    await validateRoomName(name);
    await isNewRoom(name);
    console.log('category:', category)
    await createRoom({ name, user_id, category, description, welcomeMessage, password }, 'admin');

    res
      .status(201)
      .json({ statusCode: 201, message: 'room has been created successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = addRoom;
