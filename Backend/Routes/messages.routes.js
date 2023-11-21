const messageController = require("../Controllers/messages.socket");

module.exports = (io, socket) => {
    messageController.reloadChat(io, socket)
    messageController.sendMessage(io, socket)
}