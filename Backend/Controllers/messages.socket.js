const messageModel = require("../Models/message.model")

const sendMessage = (io, socket) => {
    socket.on("send_massage", async data => {
        await messageModel.create({
            User: data.UUID,
            Message: data.Message,
            ConversationId: data.ChatId
        });

        io.to(data.chatId).emit("reload chat", data);
    })
}

const reloadChat = (io, socket) => {
    socket.on("reload chat", async (data) => {
        const messages = await messageModel.find({ConversationId: data.ChatId})

        io.to(data.chatId).emit("on chat reloaded", messages);
    })
}

module.exports = {
    sendMessage,
    reloadChat
}
