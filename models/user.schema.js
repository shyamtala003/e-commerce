import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    user:{
        type:string,
        required:[true,"name is required"],
        maxLength:[50,"Name must be less then 50 charecter"]
    }
})