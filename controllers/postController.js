const { validationResult } = require('express-validator');

const Post = require('../models/postModel');

const createPost = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { title, description } = req.body;

        var obj = {
            title,
            description
        }

        if(req.body.categories){
            obj.categories = req.body.categories;
        }

        const post = new Post( obj );

        const postData = await post.save();

        const postFullData = await Post.findOne({ _id: postData._id }).populate('categories');

        return res.status(200).json({
            success: true,
            msg: 'Post Created Successfully',
            data: postFullData
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

module.exports = {
    createPost
}