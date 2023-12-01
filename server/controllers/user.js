import asyncHandler from 'express-async-handler';
import User from '../model/user.js'
import bcrypt from 'bcrypt';
export const register =   asyncHandler(async(req,res) =>{
    const {email , password , name} = req.body;
    if(!email || !password || !name) 
    return res.status(400).json({
        sucess:false,
        message: "missing inputs"
    })
    const hashPassword = await bcrypt.hash(password , 10)
    const response = await  User.create({
        ...req.body,
        password : hashPassword
    })
    return res.status(200).json({
        sucess : response ? true :false,
        response
    })
})

