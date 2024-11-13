const prisma = require("../lib/prisma")


// create categeory 
exports.createCategory = async (req, res)=>{
   console.log(req.body) 
    const {name ,description, image} = await req.body;

    try {

        const newCategory = await prisma.category.create({
            data:{
                name,
                description,
                image
            }
        })
        res.status(200).json(newCategory)
        } 
    catch (error) {
    res.status(401).json("Failed to create category")
        
}}

// update category 

exports.updateCategory = async (req,res ) =>{
    const {id} = req.params;
    const {name , image,description} = await req.body;
   if(!id ){
      return res.status(400).json("Id id required to update")
   }  

   const updateData = {};
   if(name) updateData.name = name;
   if(image) updateData.image = image; 
   if(description) updateData.description = description;


    if(Object.keys(updateData).length === 0){
      return res.status(400).json("Please provide atleast one field to update")
  }
    
   try {
    const updateCategory = await prisma.category.update({
        where:{
            id
        },
        data:updateData
    })

    res.status(200).json(updateCategory)
    
   } catch (error) {
    if (error.code === 'P2025') {
        res.status(404).json({ message: 'Category not found' });
    }
    else {
        res.status(500).json({ message: 'Internal Server Error :: cant update the category' });
    }
    
   }

}


// delete category 

exports.deleteCategory = async (req, res) => {
    const  {id} = req.params;
    if(!id){
        res.status(500).json( "Please provide valid details")
    }
    const deleteCategory = await prisma.category.delete({
        where:{
            id
        }
    })
    res.status(200).json("Category is removed")

}

// get category 

exports.getCategory = async (req, res) =>{
    
    try {
        const category = await prisma.category.findMany();
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(`Failed to get category ${error.message} ` )
    }
}

// get all workers

exports.getAllWorkers = async (req, res) => {
    try {
        const workers = await prisma.worker.findMany
        res.status(200).json(workers)
        
    } catch (error) {
        res.status(500).json(`Failed to get workers ${error.message} ` )
    }
}

exports.deleteWorkerById = async (req, res) =>{
    const {id}  = req.body;
    const DeleteWorker = await prisma.worker.delete({
        where: {
            id
        }
    })
    res.status(200).json("Worker deleted"+DeleteWorker)
}


// get workers by id

exports.getWorkerById = async (req, res) =>{
    const {workerId} = req.body
try {
    const workerById = await prisma.worker.findUnique({
        where:{
            workerId
        }
    })
    res.status(200).json(workerById)
    
} catch (error) {
    res.status(400).json(error.message)
    
}
   

    
}


// get all active bokking
exports.getActiveBokking = async (req, res) =>{

    try {

        const bokking = await prisma.booking.findMany({
            where:{
                isActive:true
            }
        })
        res.status(200).json(bokking)
    } catch (error) {
        res.status(500).json(error.message)
    }
}



// getting the bokking by id 
exports.getBokkingById = async (req,res) =>{
    const {bokingId} = req.body;
    if (!bokingId) {
        
        return res.status(500).json("Provide the bokking id")
    }
    try {
        const bokkingById  = await prisma.booking.findUniqueOrThrow({
            where:{
                bokingId
            }
        })
        res.status(200).json(bokkingById)
        
    } catch (error) {
        res.status(400).json(error.message)
    }
  



}


// services 

//1> create

exports.createServies = async (req,res) =>{
    const  {name,description, categoryId}  = req.body;
    if(!name || !description || !categoryId){
     return res.status(404).json("Provide all details")
    }
    const services = await prisma.service.create ({
        data:{
            name,
            description,
            category : {
                connect:{id:categoryId}
            }
          
        }
    })

    res.status(201).json("New services is added")
    console.log(services)

}
//2> update
//3>  delete

