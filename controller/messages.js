const Message = require('../models/message')

const getChat = async(req, res) =>{
    const myUid = req.uid;
    const messageFrom = req.params.from;
    const last30 = await Message.find({
        $or: [{from: myUid, to: messageFrom},{from: messageFrom, to: myUid}]
    })
    .sort({ createdAt: 'desc'})
    .limit(30)
    res.json({
        ok: true,
        messages: last30
    })
}

module.exports ={getChat}