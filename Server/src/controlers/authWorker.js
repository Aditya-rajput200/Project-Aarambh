const prisma = require("../lib/prisma")

const bycrypt = require('bcrypt');
const { createToken } = require("../middleware/auth");
const { config } = require("dotenv");
const twilio = require("twilio");
const { verifyCode } = require("./Phone_auth");





//worker sigin 





exports.loginPhone = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json("Please provide both phone number and OTP");
  }

  try {
    // Check if the phone number exists
    const checkPhone = await prisma.worker.findUnique({
      where: { phone },
    });

    if (!checkPhone) {
      return res.status(404).json("User does not exist");
    }

    // Verify the OTP
   const isVerified = verifyCode(phone,otp)
    if (!isVerified) {
      return res.status(401).json("Invalid OTP or verification failed");
    }

    // Create a token
    const token = createToken({
      id: checkPhone.id,
      role: "worker",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json(`OTP verification failed: ${error.message}`);
  }
};




 
 //2> email  verifcation 
 
 exports.emailLogin = async (req, res) => {
  const {email,password} = req.body;
  
  // check weather email exist or not
  const checkEmail = await prisma.worker.findUnique({
    where:{
      email
    }
  });

  if(!checkEmail){
return res.status(500).json("Email does not exist ")
  }

  const decode = await bycrypt.compare(password,checkEmail.password)
  
  if(decode){
    const token = createToken({
      id : checkEmail.id,
      role : "worker"
    })
    res.status(200).json("Login Succesfully" + token)
  }
  else{
    res.status(500).json("Wrong Credencials")
  }
  


 }



// Worker sign up  
  


exports.SignUp = async (req, res) =>{
    let {name,email, password, phone  , addresh, adhaarId,image , otp}  = req.body;

    // checks 
    if(!name || !email || !password || !phone || !addresh || !adhaarId){
       return res.status(500).json("Provide all details")

    }
    const checkEmail = await prisma.worker.findUnique({
      where:{
        email
      }
    });
    if(checkEmail){
     
      return res.status(500).json("Email is already exist")

    }
   
      
    

    // const checkPhone = await prisma.worker.findUnique({
    //   where:{
    //     phone
    //   }
    // });
    // if(checkPhone){
    //   return  res.status(404).json("Phone already exist")
    // }
    // hash password before saving
    const hashedPassword = await bycrypt.hash(password,10)

    // verify the phone 
        
 
     verifyCode(phone,otp)
      if(verifyCode) {

        const worker = await prisma.worker.create({
          data:{
            name,
            email,
            password:hashedPassword,
            image,
            phone,
            addresh,
            adhaarId, 
          
          

          }
        })
 
        res.status(200).json("Worker is created"+worker)
      }


   

}

/// creating the diffrent route fot the the worker otp verififcation and the phone no taken 

