const express = require("express");
require("dotenv").config();
const userRouter  = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const PORT =  process.env.PORT  || 3000;
const app = express();
app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
//app.use('/api/worker',)


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
}) 