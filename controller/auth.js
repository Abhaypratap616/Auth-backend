const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/user');
const user = require('../model/user');
require('dotenv').config();
exports.siginup = async (req, res) => {
    try{
        const{name,email,password,role} = req.body;
        const prevoiusUser = await User.findOne({email});
        if(prevoiusUser){
            return res.status(400).json({message: 'User already exists'});
        }
        let hashedPassword;
        try{
             hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({message: 'Internal server error'});
        }
        const newUser = new User({name,email,password:hashedPassword,role});
        await newUser.save();
        return res.status(201).json({message: 'User created successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};
//login function4

exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const userexist = await User.findOne({email});
        if(!userexist){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const payload = {
            email: userexist.email,
            role: userexist.role,

        };
        const isMatch = await bcrypt.compare(password,userexist.password);
        if(isMatch){   
           
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            userexist.password = undefined;
            userexist.token = token;
            userexist = userexist.toObject();

            cookieOptions = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie('phlicookie', token, cookieOptions).status(200).json({message: 'Login successful', token, userexist});
           
        }
        else{
            return res.status(400).json({message: 'Invalid credentials'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};



