import asyncHandler from 'express-async-handler';
import Product from '../model/products.js'
import slugify from 'slugify'
import mongoose from 'mongoose';

export const createProduct = asyncHandler(async(req,res) =>{
    if(Object.keys(req.body).length === 0) throw new Error("missing input")
    
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)

    const newProduct = await Product.create(req.body)
    
    return res.status(200).json({
        success : newProduct ? true : false,
        message : newProduct ? newProduct : "Tạo sản phẩm thất bại"
    })
})

export const getAllProduct = asyncHandler(async(req,res) =>{
    // if(Object.keys(req.body).length === 0) throw new Error("missing input")

    const allProduct = await Product.find()
    
    return res.status(200).json({
        success : allProduct ? "Gọi sản phẩm thành công" : false,
        message : allProduct ? allProduct : "Gọi sản phẩm thất bại"
    })
})
export const getDetailProduct = asyncHandler(async(req,res) =>{

    const {id} = req.params
    const detailProduct = await Product.findById(id)
    
    return res.status(200).json({
        success : detailProduct ? "Gọi sản phẩm thành công" : false,
        message : detailProduct ? detailProduct : "Gọi sản phẩm thất bại"
    })
})

export const deleteProduct = asyncHandler(async(req,res) =>{
    const {id} = req.params
    const deleteProduct = await Product.findByIdAndDelete(id)
    if(!deleteProduct) throw new Error("Sản phẩm không tồn tại")
    return res.status(200).json({
        success : deleteProduct ? "Xóa sản phẩm thành công" : false,
        message : deleteProduct ? deleteProduct : "Xóa sản phẩm thất bại"
    })
})


export const updateProduct = asyncHandler(async(req,res) =>{
    const {id} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const update = await Product.findByIdAndUpdate(id, req.body , {new:true})
    
    return res.status(200).json({
        success : update ? "update sản phẩm thành công" : false,
        message : update ? update : "update sản phẩm thất bại"
    })
})
