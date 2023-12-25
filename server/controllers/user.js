import asyncHandler from 'express-async-handler';
import User from '../model/user.js'
import Product from '../model/products.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { AccessTokenUser, RefeshTokenUser } from '../middleware/jwt.js';
import { sendMail } from '../ulitis/sendMail.js';
import { log } from 'console';

export const register =   asyncHandler(async(req,res) =>{
    const {email , password , name} = req.body;
    if(!email || !password || !name) 
    return res.status(400).json({
        sucess:false,
        message: "missing inputs"
    })
    const user = await User.findOne({email})
    if(user) {
        throw new Error('email đã được đăng kí')
    }
    const hashPassword = await bcrypt.hash(password , 10)
    const response = await  User.create({
        ...req.body,
        password : hashPassword,
        bill:[]
    })
    return res.status(200).json({
        message :  response ? "Đăng kí thành công" : "Đăng kí thất bại",
        response
    })
})

export const checkEmail =   asyncHandler(async(req,res) =>{
    const { email } = req.query;

    try {
      const user = await User.findOne({ email });
  
      return res.status(200).json({ exists: !!user });
    } catch (error) {
      console.error('Error checking email existence:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
})

export const login =   asyncHandler(async(req,res) =>{
    const {email , password } = req.body;
    if(!email || !password ) 
    return res.status(400).json({
        sucess:false,
        message: "missing inputs"
    })
    

    const response = await User.findOne({email})
    if(!response) {
        return res.json("Email chưa được đăng kí")
    }
    const isMatch = await bcrypt.compare(
        password,
        response.password
    )
    if(!isMatch) {
        return res.json('mật khẩu không khớp')
    }



    if(response && isMatch){
        const {password, role,refreshToken, ...userData} = response.toObject()
        // AccessToken dùng để xác thực người dùng, phân quyền
        const Accesstoken = AccessTokenUser(response._id, role)
        // refreshToken dùng để cập nhật accessToken
        const newRefreshToken = RefeshTokenUser(response._id)

        // Lưu refreshToken vào db
        await User.findByIdAndUpdate(response._id, {refreshToken : newRefreshToken}, {new:true})
        res.cookie('refreshToken', newRefreshToken, {httpOnly:true, maxAge: 60*60*1000})
        return res.status(200).json({
            message: "đăng nhập thành công",
            Accesstoken,
            userData
        })
    }
    
})



export const getAllUser =   asyncHandler(async(req,res) =>{

    const response = await User.find({})
     if(!response || response.length === 0){
        return res.status(404).json({
            message:"Không tìm thấy sản phẩm"
        })
     }   

    return res.status(200).json({
        message: "Gọi danh sách users thành công",
        response
    })
})

export const getUserDetail = asyncHandler(async(req,res) =>{
    const {_id} = req.user
    // select dùng để giấu các trường không mong muốn bị lộ 
    const response = await User.findById(_id).select('-password  -refreshToken')

    return res.status(200).json({
        message: "Gọi users thành công",
        response
    })
})
// export const getDetailUser = asyncHandler(async(req,res) =>{

//     const {id} = req.params
//     const detailProduct = await User.findById(id)
    
//     return res.status(200).json({
//         success : detailProduct ? "Gọi sản phẩm thành công" : false,
//         message : detailProduct ? detailProduct : "Gọi sản phẩm thất bại"
//     })
// })

export const refreshToken = asyncHandler(async(req,res) =>{
    // lấy cookie
    const cookie = req.cookies;
    // kiểm tra
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token') ;
    // xác thực
    const rs = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id:rs._id, refreshToken:cookie.refreshToken})

    return res.status(200).json({
        success : response ? true : false,
        newAccessToken : response ? AccessTokenUser(response._id, response.role) : "Token not match"
    })
})

// export const logout = asyncHandler(async (req, res) =>{
//     const cookie = req.cookies;
//     if(!cookie || !cookie.refreshToken) throw new Error("refresh token invalid")
//     // xóa cookie
//     await User.findOneAndUpdate({refreshToken:cookie.refreshToken}, {refreshToken:''}, {new:true})
//     res.clearCookie('refreshToken', {
//         httpOnly: true,
//         secure : true
//     })

//     return res.status(200).json({
//         success : true ,
//         message : "logout thành công"
//     })

// })

export const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
  
    // Xử lý đăng xuất trên server, xóa refresh token từ cơ sở dữ liệu
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: '' }, { new: true });
  
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    });
  
    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công"
    });
  });

export const forgotPassword = asyncHandler(async (req,res) =>{

    

    const {email} = req.query
    if(!email ) throw new Error("Missing email input")
    const user = await User.findOne({email})
    if(!user) throw new Error("User not Found")


    const resetTokenPass = user.createPasswordChangedToken();

    await user.save()

    const html  = `Xác nhận reset password <a href=${process.env.URL_SERVER}/api/user/forgotPassword/${resetTokenPass}>Click</a>`

    const data = {
         email,
        html
    }

    const response = await sendMail(data)

    return res.status(200).json({
        success: true,
        response
    })

})

export const resetPassword = asyncHandler(async(req,res) =>{
    const {password, token} = req.body;
    if(!password || !token) throw new Error("missing input")
    
    const hashPassword = await bcrypt.hash(password , 10)


    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt:Date.now()}})
    if(!user) throw new Error("invalid reset token")
    console.log('user', user);
    user.password = hashPassword
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message : user ? "Update password success" : " Something wrongs"

    })

})



export const deleteUser =   asyncHandler(async(req,res) =>{

    const response = await User.findByIdAndDelete(req.params.id)
    if(!response || response.length === 0) {
        return res.json(" user không tồn tại")
    }
   
    return res.status(200).json({
        message: "Xóa user thành công",
        response
    })
})

export const updateUser =   asyncHandler(async(req,res) =>{
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const response = await User.findByIdAndUpdate(_id, req.body, {new:true})
    if(!response || response.length === 0) {
        return res.json(" user không tồn tại")
    }
   
    return res.status(200).json({
        message: "Update user thành công",
        response
    })
})

export const updateAddressUser =   asyncHandler(async(req,res) =>{
    const {_id} = req.user
    if(!_id  || !req.body.address) throw new Error("Missing inputs")
    const response = await User.findByIdAndUpdate(_id, {$push : { address :  req.body.address}}, {new:true})
    if(!response || response.length === 0) {
        return res.json(" user không tồn tại")
    }
   
    return res.status(200).json({
        message: "Update address thành công",
        response
    })
})
export const updateUserById =   asyncHandler(async(req,res) =>{
    const {id} = req.params
    if(!id || Object.keys(req.body).length === 0) throw new Error("Missing inputs")
    const response = await User.findByIdAndUpdate(id, req.body, {new:true})
    if(!response || response.length === 0) {
        return res.json(" user không tồn tại")
    }
   
    return res.status(200).json({
        message: "Update user thành công",
        response
    })
})

export const updateCartUser =   asyncHandler(async(req,res) =>{
    const {_id} = req.user
    const {pid,quantity,color} = req.body
    if(!pid || !quantity || !color) throw new Error("Missing inputs")
    const user =  await User.findById(_id).select('cart')

    // const alreadyCart = await user.cart.find(item => item.product.toString() === pid)
    
       

         const response = await  User.findByIdAndUpdate(_id, {$push : {cart: {product : pid, quantity, color}} }, {new:true} )
        
     

        return res.status(200).json({
            message: "Update cart thành công",
            // total : totalPrice,
            response
        })
   
})

export const deleteCartUser =   asyncHandler(async(req,res) =>{
    const {_id} = req.user
    const {pid} = req.body; 
    if(!pid ) throw new Error('missing input')
         const response = await  User.findByIdAndUpdate(_id, {$pull : {cart : {product : pid}}}, {new:true} )
        if(!response ) throw new Error("undefind")
        return res.status(200).json({
            message: "Delete product thành công",
            // total : totalPrice,
            response
        })
   
})

