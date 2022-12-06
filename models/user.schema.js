import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import crypto from 'crypto';

import authRole from '../utils/authRole';
import config from '../config/index'


const userSchema=mongoose.Schema({
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

);

// mongoose hooks
userSchema.pre("save",async function(next){
    if(this.modified(this.password))
    {
        this.password= await bcrypt.hash(this.password,10);
        next();
    }
    else
    {
        return next();
    }
})

// add some more functionality to user schema
// user define methods for mongoose schema
userSchema.methods={

    // comparing password
    comparePassword: async function(enteredPassword)
    {
        return await bcrypt.compare(enteredPassword,this.password);
    },

    // geerate jwt token
    generateJwtToken:function()
    {
        return JWT.sign({
            _id:this._id,
            role:this.role
        },
        config.JWT_SECRET,
        {
            expiresIn:config.JWT_EXPIRY
        }
        )
    }
}

export default mongoose.model("User",userSchema);