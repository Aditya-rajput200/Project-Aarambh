const { Router } = require('express');
const adminControler = require('../controlers/admin')
const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "admin"
    })
})

adminRouter.post('signin/', (req, res) => {
    res.json({
        message: "admin"
    })
})





adminRouter.post('/updateCategory',adminControler.updateCategory );

adminRouter.post('/createCategory',adminControler.createCategory );

adminRouter.delete('/deleteCategory',adminControler.deleteCategory );

adminRouter.get('/getCategory',adminControler.getCategory );





adminRouter.get('/getAllWorkers',adminControler.getAllWorkers );

adminRouter.get('/getWorkerById',adminControler.getWorkerById );
adminRouter.delete('/deleteWorker',adminControler.deleteWorkerById)




adminRouter.get('/getActiveBokking',adminControler.getActiveBokking);

adminRouter.get('/getBokkingById',adminControler.getBokkingById);



adminRouter.post("/createServies", adminControler.createServies)



module.exports = {
    adminRouter
}