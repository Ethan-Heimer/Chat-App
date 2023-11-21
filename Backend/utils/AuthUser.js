const user = require("../models/UserModel")
const jwt = require('jsonwebtoken');

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if(err)
            return res.status(404).json({status: false, message: err.message});
        
        const user = await user.findById(data.id)

        if(user)
            return  res.status(200).json({status: true, user: user.username});
        else
            return res.status(404).json({status: false, message: err.message})
    })
}