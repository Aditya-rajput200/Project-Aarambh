// user can create boking *******
// user can get the previous bokking  ******
// user can  get the current  bokking by them  *****



// user can get the category *****
// user can get the services   ******

// user can get the worker profile  *****


// user can create a review 



const prisma = require("../lib/prisma")

// create bokking
exports.createBokking = async (req, res) =>{
    const {workerId,userId,serviceId,date,price,location} = req.body;

    if(!workerId && userId && serviceId && date && price && location)
        {
        return res.status(400).json("Provide all details")
    }

    const newBokking = await prisma.booking.create({
        data:{
            workerId,
            userId,
            serviceId,
            date,
            price,
            location


        }})  

    res.status(200).json("New bokking is create " + newBokking)}


 // previous bokking
 exports.getPreviousBokking = async (req, res) =>{

    const {userId} = req.params;
    if(!userId){
        res.status(500).json("userId is not provided")
    }
    
   
    const previousBokking = await prisma.user.findUnique({

        where:{
          id:userId
        },
        include:{
            orders:true
        }
    })
    res.status(200).json(previousBokking.orders)
 }     

  // current bokking or active bokking
  exports.CurrentBokking = async (req,res) =>{
    const {userId} = req.params;

    const currentBokking = await prisma.booking({
        where:{
            userId,
            isActive:true,
        },
        include:{
          services :true
        }
    })

    res.status(200).json({
        "Active": currentBokking.isActive,
        "Paid" :currentBokking.isPaid,
        "User" : userId,
        "Service":currentBokking.services


    })

  }



  // get category
  exports.getCategory = async (req,res) =>{
    try {
        const category = await prisma.category.findMany()
        res.status(200).json(category)
        
    } catch (error) {
        res.status(500).json(error)
    }
   

  }


  // get services by category
  exports.getServices = async (req,res) =>{
    try {
        const services = await prisma.service.findMany({
            where:{
                categoryId:req.params.categoryId
            }
        })
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json(error)
    }
  }


  // get worker profile
exports.getWorkerProfile = async (req,res) =>{
    try {
        const worker = await prisma.worker.findUnique({
            where:{
                id:req.params.workerId
            }
        })
        res.status(200).json(worker.name, worker.image, )
    } catch (error) {
        res.status(500).json(error)
    }
}


// create a review
exports.createReview = async (req,res) =>{
    try {
        const review = await prisma.review.create({
            data:{
                userId:req.params.userId,
                workerId:req.params.workerId,
                stars:req.body.stars,
                comment:req.body.comment
            }
        })
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json(error)
    }   }