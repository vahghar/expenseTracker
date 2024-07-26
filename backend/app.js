const express = require('express');
const app = express();
const userRouter = require("./routes/userRouter")
const mongoose = require("mongoose");

//connect to mongodb
mongoose.connect("mongodb+srv://raghav77g:periodictable22g@mern-expense.cq7mm1g.mongodb.net/expenses").then(()=>console.log("db connected")).catch((e)=>console.log(e));


//middlewares
app.use(express.json());

//routes
app.use('/',userRouter);


//start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server is running on this port ${PORT}`));