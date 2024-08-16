const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require("./routes/userRouter")
const mongoose = require("mongoose");
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const cors = require("cors")

//connect to mongodb
mongoose.connect("mongodb+srv://raghav77g:periodictable22g@mern-expense.cq7mm1g.mongodb.net/expenses").then(()=>console.log("db connected")).catch((e)=>console.log(e));
const corsOptions = {
    origin: 'http://localhost:5173',
};

const corsOptions ={
    origin: ["http://localhost:5173/"]
}
app.use(cors(corsOptions));

//middlewares
app.use(express.json());
app.use(cors(corsOptions))

//routes
app.use('/',userRouter);
app.use('/',categoryRouter);
app.use('/',transactionRouter);

//error
app.use(errorHandler)

//start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server is running on this port ${PORT}`));