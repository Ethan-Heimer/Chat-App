const conversationModel = require("../Models/conversation.model");

const join = (io, socket) => {
    socket.on("join", data => {
        socket.join(data.chatId, async() => {
            const existingChat = await conversationModel.findById(data.ChatId);
            if(!existingChat)
               await conversationModel.create({Users: data.userIds})

            socket.emit("reload chat", data)
        })
    })
}

module.exports = {
    join
}