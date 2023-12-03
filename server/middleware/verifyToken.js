import jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler';

export const verifyAccessToken = asyncHandler(async (req,res,next) =>{
    if(req?.headers?.authorization?.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) =>{
            if(error) {
                return res.status(401).json({
                    success : false,
                    message: "Invalid access token "
                })

            }
            console.log("decode là", decode);
            req.user = decode
            next()
        })
    }else{
        return res.status(401).json({
            success: false,
            message: "Required authen"
        })
    }
})
// đặt isAdmin sau hàm verify thì sẽ dùng đươc req.user của hàm trên
export const isAdmin = asyncHandler(async (req,res, next) =>{
    const {role} = req.user
    if(role !== "admin") 
    return res.status(401).json({
        success : false,
        message : "Required admin role"
    })
    next()


})