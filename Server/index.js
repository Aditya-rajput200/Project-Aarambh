const express = require("express");
require("dotenv").config();
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const userRouter  = require("./src/routes/user");
const { adminRouter } = require("./src/routes/admin");
const { workerRouter } = require("./src/routes/worker");
var cookieParser = require('cookie-parser')
const PORT =  process.env.PORT  || 3000;

// middlewares
const app = express();
app.use(helmet())    
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use(limiter)


app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/worker',workerRouter);


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
}) 