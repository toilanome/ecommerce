import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // bỏ dấu cách ' '
        trim : true
    },
    // convert kiểu : đồng hồ. thành. dong-ho   
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        // ref dùng để liên kết bảng
        ref: "Category"
    },
    quantity:{
        type:Number,
        default: 0
    },
    sold:{
        type:Number,
        default: 0
    },
    images:{
        type:Array,
        
    },
    total:{
        type : Number,
        default : 0
    },
    color:{
        type:String,
        // enum là giá trị cho trước
        enum: ["Black", "Red", "Blue"]
    },
    ratings:[
        {
            star : { type:Number},
            // postedBy : người vote
            postedBy : {type: mongoose.Types.ObjectId, ref:"User"},
            comment : { type:String}
        }
    ],
    totalRating:{
        type:Number,
        default : 0
    },
  
},
    {timestamps: true}
);

//Export the model
export default mongoose.model('Product', userSchema);