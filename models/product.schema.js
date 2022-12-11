import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"product name should be required"],
            maxLength:[120,"product name should not be more then 120 charecter"],
            trim:true
        },
        price:{
            type:Number,
            reuired:[true,"product price must be required"],
            maxLength:[5,"product price should not be more then 5 digit"]
        },
        description:{
            type:String
        },
        photos:[
                {
                    secure_url:{
                        type:String,
                        required:true
                    }
                }
        ],
        stock:{
            type:Number,
            default:0
        },
        sold:{
            type:Number,
            default:0
        },
        collectionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Collection"
        }


    },
    {
        timestamps:true
    }
)

export default mongoose.model("Product",productSchema);