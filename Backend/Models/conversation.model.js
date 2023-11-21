const mongoose = require("mongoose");

const conversation = new mongoose.Schema({
    Users: Array
})

module.exports = mongoose.Schema("Conversations", conversation);