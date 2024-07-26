//models are like classes, so start with capital letter
const mongoose = require("mongoose")

//schema is basically the blueprint for the model
const userSchema  = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
        },

        email:{
            type:String,
            required: true,
            unique: true,
        },

        password:{
            type:String,
            required: true,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User",userSchema);