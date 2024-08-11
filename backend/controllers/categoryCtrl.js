const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');
const Transaction = require('../model/Transaction');

//User Registration

const categoryController = {
    //create
    create: asyncHandler( async (req,res)=>{
        const {name,type} = req.body;
        if(!name || !type){
            throw new Error('Name and type are required for creating a category');
        }
        //convert the name to lowercase
        const normalizedName = name.toLowerCase();
        //check if type is valid
        const validTypes = ["income","expense"];
        if(!validTypes.includes(type.toLowerCase())){
            throw new Error("Invalid category type "+ type);
        }
        //check if category already exists on the user
        const categoryExists = await Category.findOne({
            name: normalizedName,
            user: req.user,
        })

        if(categoryExists){
            throw new Error(`Category  ${categoryExists.name} already exists in the database`);
        }
        //create the category
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        })
        res.status(201).json(category);
    }),

    //Lists
    lists: asyncHandler( async (req,res)=>{
        const categories = await Category.find({user:req.user});
        res.status(201).json(categories);
    }),

    //update
    update: asyncHandler( async (req,res)=>{
        const categoryId = req.params.id;
        const {type,name} = req.body;
        const normalizedName = name.toLowerCase();
        const category = await Category.findById(categoryId);
        if(!category && category.user.toString() !== req.user.toString()){
            throw new Error("category not found or user not authorized");
        }
        const oldName = category.name;
        //update category properties
        category.name = normalizedName;
        category.type=  type;
        const updatedCategory = await category.save();
        //update affected transaction
        if(oldName.toLowerCase() !== updatedCategory.name.toLowerCase()){
            await Transaction.updateMany({
                user: req.user._id,
                category: oldName
            },
            {
                $set:{category: updatedCategory.name}
            });
        }
        res.json(updatedCategory);
    }),

    //delete
    delete: asyncHandler( async (req,res)=>{
        const category = await Category.findById(req.params.id);
        if(category && category.user.toString() === req.user.toString()){
            const defaultCategory = 'Uncategorized';
            await Transaction.updateMany(
                {user: req.user, category: category.oldName},
                {$set: {category:defaultCategory}}
            );
            //remove category
            await Category.findByIdAndDelete(req.params.id);
            res.json({message:"Category removed and transactions updated"});
        }else{
            res.json({message:"category not found"})
        }
    })

};

module.exports=categoryController;