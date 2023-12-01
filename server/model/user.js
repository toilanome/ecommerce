import mongoose from 'mongoose';// Erase if already required
import bcrypt from 'bcrypt'
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default : 'user'
    },
    cart:{
        type:Array,
        default:[],
    },
    address:[
        {type:mongoose.Types.ObjectId, ref : "Address"}
    ],
    wishlist: [
        {type:mongoose.Types.ObjectId, ref :'Product'}
    ],
    isBlocked : {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type:String
    },
    passwordChangedAt: {
        type:String
    },
    passwordResetToken: {
        type:String
    },
    passwordResetExpires: {
        type:String
    }
}, {
    timestamps: true
});

//Export the model
export default mongoose.model('User', userSchema);