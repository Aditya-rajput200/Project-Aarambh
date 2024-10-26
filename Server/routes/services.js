const { Router } = require('express');
const serviceRouter = Router();

serviceRouter.post('/purchase', (req, res) => {
    res.json({
        message: "service"
    })
})

serviceRouter.get('/preview', (req, res) => {
    res.json({
        message: "service"
    })
})

module.exports = {
    serviceRouter: serviceRouter
}