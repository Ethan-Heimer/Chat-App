const converstaionController = require("../Controllers/conversations.socket");

module.exports = (io, socket) =>{
    converstaionController.join(io, socket);
} 