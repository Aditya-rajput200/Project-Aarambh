const { config } = require("dotenv");
const twilio = require("twilio");

// Set up your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID; // Your existing Service SID from Twilio Dashboard

const client = twilio(accountSid, authToken);



// Function to check if the OTP is correct
exports.verifyCode = (phone,code)=>{


async(req,res)=> {
    

   phone = `+91${phone}`
  try {
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: phone,
        code: code,
      });

    console.log("Verification check status:", verificationCheck.status);
     
    if(verificationCheck.status.includes("approved")) {
      res.status(200).json("Opt veirfication succesfull")
        return true
    }
    else{
      res.status(404).json("Wrong otp")
        return false
    }
  } catch (error) {
    console.error("Error verifying code:", error.message);
    res.status(500).json("veification failed")
   
  }
}
}
 // 1> mobile otp veirfication


exports.sendOtp = async (req, res) => {
  let { phone } = req.body;

  if (!phone) {
    return res.status(400).json("Please provide the phone number");
  }
  phone = `+91${phone}`

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    console.log("Verification status:", verification.status);
    res.status(200).json(`OTP sent to +91 ${phone}`);
  } catch (error) {
    console.error("Error sending verification:", error.message);

    // Handle specific errors if needed
    if (error.code === 21614) {
      res.status(400).json("Invalid phone number");
    } else {
      res.status(500).json("Failed to send OTP");
    }
  }
}


