import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        unique:true,
        defaultValue : "UnCategorized"
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        defaultValue : "unCategorized"

    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
},
{
    timestamps:true, versionKey:false
});

//Export the model
export default mongoose.model('Category', categorySchema);