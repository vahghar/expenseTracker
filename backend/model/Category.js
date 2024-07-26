//models are like classes, so start with capital letter
const mongoose = require("mongoose")

//schema is basically the blueprint for the model
const categorySchema  = new mongoose.Schema(
    {
        //whose creating the category, so referencing to the user
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        name:{
            type:String,
            required: true,
            default: "Uncategorized",
        },

        type:{
            type:String,
            required: true,
            enum: ["income","expense"],
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Category",categorySchema);