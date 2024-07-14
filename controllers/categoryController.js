const { validationResult } = require('express-validator');
const Category = require('../models/categoryModel');

// add_category
const addCategory = async(req, res) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { category_name } = req.body;

         const isExists = await Category.findOne({
            name:{
                $regex: category_name,
                $options: 'i'
            }
         })

         if(isExists){
            return res.status(400).json({
                success: false,
                msg: 'Category name already exists!'
            });
         }

        const category = new Category({
            name: category_name
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success: true,
            msg: 'Category Created Successfully!',
            data: categoryData
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}
// get_categories
const getCategories = async(req, res) => {
    try{

        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            msg: 'Category Fetched Successfully!',
            data: categories
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}
// delete_categories
const deleteCategory = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        const categoryData = await Category.findOne({ _id:id });

        if(!categoryData){
            return res.status(400).json({
                success: false,
                msg: "Category ID doesn't exists!"
            });
        }

        await Category.findByIdAndDelete({ _id:id });

        return res.status(200).json({
            success: true,
            msg: 'Category Delete Successfully!'
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}
// update_category
const updateCategory = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id, category_name } = req.body;

        const categoryData = await Category.findOne({ _id:id });

        if(!categoryData){
            return res.status(400).json({
                success: false,
                msg: "Category ID doesn't exists!"
            });
        }

        const isExists = await Category.findOne({
            _id:{ $ne: id },
            name:{
                $regex: category_name,
                $options: 'i'
            }
        })

        if(isExists){
            return res.status(400).json({
                success: false,
                msg: 'Category name alerdy assigned to another category!'
            });
        }

        const updatedData = await Category.findByIdAndUpdate({ _id:id },{
            $set:{
                name: category_name
            }
        }, { new:true });

        return res.status(200).json({
            success: true,
            msg: 'Category Updated Successfully!',
            data: updatedData
        });

    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
}