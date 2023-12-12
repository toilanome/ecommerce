import asyncHandler from 'express-async-handler';
import Order from '../model/order.js'
import User from '../model/user.js'

export const createOrder =   asyncHandler(async(req,res) =>{
    const {_id} = req.user;

    // populate dùng để liên kết bảng 
    const UserCart = await User.findById(_id).select('cart').populate('cart.product', 'title price ')
    const products = UserCart?.cart?.map((item) =>({
        product : item.product._id,
        count: item.quantity,
        color : item.color

    }))
    const total = UserCart?.cart?.reduce((sum,item) =>{ 
        return  sum + item.product.price * item.quantity
    }, 0)

    const response = await Order.create({products, total ,orderBy:_id })
    return res.status(200).json({
        message :  "Tạo đơn hàng thành công",
        response : response ? response : "Something wrong",
        UserCart
    })
})  

export const getOrder =   asyncHandler(async(req,res) =>{
    // const {_id} = req.user;

    // populate dùng để liên kết bảng 
    // const UserCart = await User.findById(_id).select('cart').populate('cart.product', 'title price ')
    // const products = UserCart?.cart?.map((item) =>({
    //     product : item.product._id,
    //     count: item.quantity,
    //     color : item.color

    // }))
   

    const response = await Order.find()
    if(!response ) throw new Error('Không có đơn hàng nào tồn tại')
    return res.status(200).json({
        message :  "Gọi đơn hàng thành công",
        response : response ? response : "Something wrong",
    })
})  

