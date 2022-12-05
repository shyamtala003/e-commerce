import mongoose from 'mongoose';
import authRole from '../utils/authRole'

const userSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"name is required"],
        maxLength:[50,"Name must be less then 50 charecter"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"password must be at least 8 charecter long"],
        select:false
    },
    role:{
        type:String,
        enum:Object.values(authRole),
        default:authRole.USER
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    },
    {
        timestamps:true
    }

)

export default mongoose.model("User",userSchema);