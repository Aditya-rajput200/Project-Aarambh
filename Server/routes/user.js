const express = require("express")
const { Router } = require('express');
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { auth, JWT_SECRET } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const userRouter = Router();

userRouter.use(express.json());

userRouter.post('/signup', async (req, res) => {
    //Input Validation (using zod)
    const requirBody = z.object({
        email: z.string().min(4).max().email(),
        password: z.string().min(4).max(10),
        firstName: z.string().min(4).max(10),
        lasttName: z.string().min(4).max(10),
    })
    const parseDataWithSuccess = requirBody.safeParse(req.body)

    if (!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parseDataWithSuccess.error
        })
        return
    }

    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.name
    const lastName = req.body.name


    //Error Handling (using try, catch)

        //Hashing and salting (using bcrypt)
        const hashedPassword = await bcrypt.hash(password, 5)
        console.log(hashedPassword)
    
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            messgae: "You are signed up succesfully"
        })
})

userRouter.post('/signin', async (req, res) => {
    const email = req.body.email
    const password =  req.body.password

    const user = await userModel.findOne({
        email: email
    })
    console.log(user)

    if (!user) {
        res.json({
            message: "User not exist in bd"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

userRouter.get('/purchases', (req, res) => {
    res.json({
        message:"user"
    })
})

module.exports = {
    userRouter: userRouter
}