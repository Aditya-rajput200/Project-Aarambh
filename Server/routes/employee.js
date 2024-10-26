const { Router } = require('express');
const employeeRouter = Router();

employeeRouter.post('/signup', (req, res) => {
    res.json({
        message: "employee"
    })
})

employeeRouter.post('/signin', (req, res) => {
    res.json({
        message: "employee"
    })
})

employeeRouter.post('/service', (req, res) => {
    res.json({
        message: "employee"
    })
})

module.exports = {
    employeeRouter: employeeRouter
}