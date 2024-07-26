//models are like classes, so start with capital letter
const mongoose = require("mongoose")

//schema is basically the blueprint for the model
const transactionSchema  = new mongoose.Schema(
    {
        //whose creating the category, so referencing to the user
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        type:{
            type:String,
            required: true,
            enum: ["income","expense"],
        },

        category:{
            type:String,
            required: true,
            default: "Uncategorized",
        },

        amount:{
            type:Number,
            required: true,
        },

        date:{
            type:Date,
            required: true,
        },

        description:{
            type:String,
            required: false,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Transaction",transactionSchema);