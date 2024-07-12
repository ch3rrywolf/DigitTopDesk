const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
const registerUser = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { matricule, email, password } = req.body;

        const isExistUser = await User.findOne({ email });

        if(isExistUser){
            return res.status(200).json({
                success: false,
                msg: 'Email alerdy exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            matricule,
            email,
            password:hashedPassword
        });

        const userData = await user.save();
        
        return res.status(200).json({
            success: true,
            msg: 'Registred successfully',
            data: userData
        });
    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

// generateAccessToken
const generateAccessToken = async(user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "2h"});
    return token;
}

// Login
const loginUser = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        if(!userData){
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect'
            });
        }

        const accessToken = await generateAccessToken({ user: userData });

        return res.status(200).json({
            success: true,
            msg: 'Login Successfully',
            accessToken: accessToken,
            tokenType: "Bearer",
            data: userData
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}