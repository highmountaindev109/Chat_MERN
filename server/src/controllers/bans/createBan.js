const { createBan, validateIP } = require('../../utils');


const addBan = async (req, res, next) => {
  try {

    const { username, room, ip, startIp, endIp } = req.body;

    if(ip) {
       await validateIP(ip); 
    } else {
        if(startIp && endIp) {
            await validateIP(startIp);
            await validateIP(endIp);
        }
    }
    await createBan({ username, room, ip, startIp, endIp });

    res
      .status(201)
      .json({ statusCode: 201, message: 'room has been created successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = addBan;
