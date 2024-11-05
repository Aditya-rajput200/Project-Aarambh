
const prisma = require("../lib/prisma")
const bcrypt = require('bcrypt');


const {createToken} = require("../middleware/auth")




// email and password login verification 
exports.Login_email = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return  res.status(500).json("Provide th3e credencial ")
    }  
    // if user does not exist
   const user = await prisma.user.findUnique({
    where:{
        email:email
    }
   })

   if(!user) {
   return  res.status(400).json(
        "User does not exist")
   }

   const userPassword = await bcrypt.compare(password,user.password)

   if(userPassword){
    const token =  await createToken(user.id)
     res.status(200).json(token + "User loged in succesfully")
   }
  

   


}

   


    // phone and otp verification 
    exports.Login_phone = async (req, res) => {
        const { phone, otp } = req.body;

    };



    // google login verification 
    exports.Login_google = async (req, res) => {
        const { googleId, googleToken } = req.body;

    };



    // SignUp 

exports.SignUp = async (req,res) =>{
    const {email,name,phone,password,confirmPassword,location,image} = req.body;
    // checks

    if(!email || !name || !phone || !password || !confirmPassword || !location){
        return res.status(400).json("Please provide all details")
        
     }

     if(password !== confirmPassword){
         return res.status(400).json("Password and confirm password should be same")
     }

     

    const AllreadyExist_email = await prisma.user.findUnique({
        where:{
            email
        }
    })
   
   if(AllreadyExist_email){
       return res.status(400).json("Email already exist")
   }

   const AllreadyExist_phone= await prisma.user.findUnique({
        where:{
            phone
        }
    })
  
   if(AllreadyExist_phone){
       return res.status(400).json("Phone already exist")
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   // now after all checks creating new user

   try {
    const newUser = await prisma.user.create({
        data:{
            email,phone,password:hashedPassword,name,location,image
        }
    })

    res.status(200).json(newUser)
   
    
   } catch (error) {
    res.status(500).json("Failed to create New user")
    
   }
     

}

// SignUp using the google



