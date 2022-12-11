import mongoose from "mongoose";

const collectionSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"collection name must be required"],
            maxLength:[120,"collection name should not be more then 120 charecter"],
            trim:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Collection",collectionSchema);