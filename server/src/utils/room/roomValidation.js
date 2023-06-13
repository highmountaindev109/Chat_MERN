const yup = require('yup');

const createError = require('../createError');

const roomValidationSchema = yup.object().shape({
  name: yup.string().required().min(5).max(20),
});

const validateRoomName = async (name) => {
  try {
    await roomValidationSchema.validate({ name });
  } catch (err) {
    throw createError(400, 'Bad Request', err.errors);
  }
};

module.exports = validateRoomName;
