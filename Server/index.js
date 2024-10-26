const express = require("express");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { employeeRouter } = require("./routes/employee");
const { serviceRouter } = require("./routes/services");

const app = express();

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/service', serviceRouter);

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000")
})