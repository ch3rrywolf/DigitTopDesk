const User = require('../models/userModel');

const { ValidationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const registerUser = async(req, res) => {
    try{
        const errors = ValidationResult(req);

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

module.exports = {
    registerUser
}