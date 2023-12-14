import asyncHandler from 'express-async-handler';
import Category from '../model/categories.js'
import categoryValidator from '../Validator/category.js';

export const getAllCategories = asyncHandler(async(req,res) =>{
    const data = await Category.find({}).populate("products")
    if(!data) throw new Error("Can find category")

    return res.status(200).json({
        message:"Gọi danh sách category thành công",
        data
    })
})

export const getDetailCategories = asyncHandler(async(req,res) =>{
    const data = await Category.findById(req.params.id)
    if(!data) throw new Error("Can find category")

    return res.status(200).json({
        message:"Gọi  category thành công",
        data
    })
})

export const createCategory = asyncHandler(async(req,res) =>{
    const {error} = categoryValidator.validate(req.body, {abortEarly:false});
    if(error) {
        const errors = error.details.map(err => err.message)
        return res.status(400).json({
            message:errors
        })
    }
    const data = await Category.create(req.body)
    if(!data) throw new Error(" create category not success")

    return res.status(200).json({
        message:"Tạo  category thành công",
        data
    })
})

export const updateCategory = asyncHandler(async(req,res) =>{
    const {error} = categoryValidator.validate(req.body, {abortEarly:false});
    if(error) {
        const errors = error.details.map(err => err.message)
        return res.status(400).json({
            message:errors
        })
    }
    const data = await Category.findByIdAndUpdate(req.params.id,req.body, {new:true})


    if(!data) throw new Error(" create category not success")
    
    return res.status(200).json({
        message:"Update  category thành công",
        data
    })
})

export const deleteCategory = asyncHandler(async(req,res) =>{
   
    const data = await Category.findByIdAndDelete(req.params.id)


    if(!data) throw new Error(" cannot delete category ")
    
    return res.status(200).json({
        message:"Xóa  category thành công",
        data
    })
})