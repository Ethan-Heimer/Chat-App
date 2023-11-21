const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    Username: {
        type: String, 
        required: [true, "Username required"],
        unique: true,
        minlength: 3
    },
    Password: {
        type: String,
        required: [true, "Password required"],
        minlength: 3
    },
    Email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    }
})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

module.exports = mongoose.Schema("Users", userSchema);
