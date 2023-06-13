const { Chats } = require('../../database/models');

const getPrivateChat = async (req, res, next) => {
    console.log('req');
    try {
        let {room, from, to} = req.body;
        console.log(room, from, to);
        const chats = await Chats.find({
            $and: [
                {
                    room
                },
                {
                    $or: [ 
                        {$and: [{from} , {to}]},
                        {$and: [{from: to}, {to: from}]}
                ]}
            ]
        });
        let chatInfos = chats.map(({room, msg, from, to, date}) => ({room, msg, from, to, date}));
        return res.json({
            statusCode: 200,
            data: chatInfos,
        });
    } catch (err) {
        return next(err);
    }

}
module.exports = getPrivateChat;