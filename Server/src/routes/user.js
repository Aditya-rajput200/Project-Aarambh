const { Router } = require("express");

const userRouter = Router();
const userControler = require("../controlers/user");
const userAuth = require("../controlers/authUser");

const { auth } = require("../middleware/auth");
const { AuthorizeRole } = require("../middleware/roleAuth");



userRouter.post("/createbokking", auth, AuthorizeRole("user"), userControler.createBokking);

userRouter.post("/signUp", userAuth.SignUp);

userRouter.post("/login", userAuth.Login_email);

userRouter.post("/createReview", auth, AuthorizeRole("user"), userControler.createReview);

userRouter.get("/previousBokking", auth, AuthorizeRole("user"), userControler.getPreviousBokking);

userRouter.get("/curentBokking", auth, AuthorizeRole("user"), userControler.CurrentBokking);

userRouter.get("/category", auth, AuthorizeRole("user"), userControler.getCategory);

userRouter.get("/services", auth, AuthorizeRole("user" ), userControler.getServices);

userRouter.get("/workerProfile", auth, AuthorizeRole("user"), userControler.getWorkerProfile);

module.exports = userRouter;
