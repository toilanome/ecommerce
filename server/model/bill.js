import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var billSchema = new mongoose.Schema({
    products:[{
        product : {type : mongoose.Types.ObjectId, ref: 'Product'},
        count:Number,
        color:String
    }],
    status:{
        type:String,
       default : 'Processing',
       enum: ['Cancelled', 'Processing', 'Successed']
    },
    total:{
        type:Number,
        default:0
    },
    coupon : {
        type : mongoose.Types.ObjectId,
        ref:'Coupon'
    },
    paymentIntent:{},
    orderBy:{
        type : mongoose.Types.ObjectId,
        ref:'User'
    },
});

//Export the model
export default mongoose.model('Bill', billSchema);