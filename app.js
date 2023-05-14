// Basic Lib Imports
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
var cors = require('cors')
const { errorHandler } = require("./middleware/errorMiddleware");
// Database connection with mongoose
const connectDB = require("./config/db");
connectDB();

const userRouters = require("./routes/userRouters");
const taskRouters = require("./routes/taskRouters");
const categoryRouters = require("./routes/categoryRouters");
const tagRouters = require("./routes/tagRouters");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
// This is CORS-enabled for all origins!
app.use(cors())

app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routing Implement
app.use("/api/v1/users", userRouters);
app.use("/api/v1/tasks", taskRouters);
app.use("/api/v1/category", categoryRouters);
app.use("/api/v1/tag", tagRouters);


// Undefined Route Implement
app.use("*",(req,res)=>{
  res.status(404).json({status:"fail",data:"Not Found"})
})

// Custome error handler
app.use(errorHandler);

module.exports = app;
