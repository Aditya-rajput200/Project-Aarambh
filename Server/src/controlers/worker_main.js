/// first set up lik 111
//  busigsnees logic 

//dashboard 
// get all previous order
const prisma = require("../lib/prisma")
exports.previpousBokking  = async (req, res) =>{
    const {worker_id} = req.body ;

    if (!worker_id) {
        req.status(500).json("id of the worker is not provided")
    }
  try {
    const previous_bokking = await prisma.worker.findMany({
        where:{
            id:worker_id
        },
        include:{
            bookings:true
        }
    })
    req.status(200).json("Previous bokking is fetched"+previous_bokking)
    
  } catch (error) {
    req.status(400).json("failed to fetch the Previous bokking"+previous_bokking)
    
  }



}

// accept order
// denied the order 



// change the visiblity status
exports.changeVisiblity = async (req,res) =>{
    const {visibility,id} = req.body;
    if(!visibility || !id) {
        return res.status(500).json("Provide all details")
    }
 try {
    const change = await prisma.worker.update({
        where:{
            id: id 
        },
        data:{
            isActive:visibility
        }
    })

    return res.status(200).json("Visibility is changed succesfully" + change)

    
 } catch (error) {

    res.status(404).json("Failed to change the visility " + error.message)
    
 }
  
 
}

// map functionality for the worker to completed  the destination 