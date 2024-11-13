const { Router } = require("express");
const  workerRouter = Router ();
const workerControler = require("../controlers/authWorker");
const { sendOtp } = require("../controlers/Phone_auth");


// const { auth } = require("../middleware/auth");
// const { AuthorizeRole } = require("../middleware/roleAuth");






// Login ednpoints
workerRouter.post("/loginPhone",workerControler.loginPhone)
workerRouter.post("/loginEmail",workerControler.emailLogin)


// Sign endpoints
workerRouter.post("/signUP",workerControler.SignUp)
workerRouter.post("/sendOtp",sendOtp)

module.exports = {
    workerRouter
};
