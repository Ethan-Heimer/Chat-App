const mongoose = require("mongoose");

const messages = new mongoose.Schema({
    User: String,
    Message: String,
    ConversationId: String
})