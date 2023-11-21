const userModel = require("../Models/user.model");
const { createSecretToken } = require("../util/SecretToken")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    
    const existingUser = await userModel.findOne({username: req.username})
    if(existingUser != null){
        res.status(400).json({message: "User already exists"});
    }
        
    await userModel.create(req.body)
    .then(result => {
       
        res.status(201).json({
            response: "User succedfully created"
        })
    })
    .catch(err => {
        res.status(400).json({message: err.message})
        console.log(err);
    })
}

const signIn = async (req, rsq) => {
    const password = req.body.password;
    const username = req.body.username;

    await userModel.findOne({username}).then(result => {
        bcrypt.compare(password, result.password, (err, isMatch) => {
            if(isMatch){
                const token = createSecretToken(result._id);
                res.cookie("token", token), {
                    withCredentials: true,
                    httpOnly: false,
                }

                authenticte(res, req, token, result);
            }
        })
    })
}

const authenticate = async (req, res, _token, _user) => {
    const token = _token || req.cookies.token;
    const user = _user || await userModel.findOne({username: req.body.username});

    if(!token || _user == null) 
       return res.status(404).json({message: "token not found, failed to authenticate"});
    

    jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if(err)
           return res.status(404).json({message: err})
        
        return res.status(200).json({data: user.username})
    })    
}

module.exports = {
    signIn,
    signUp,
    authenticate
}