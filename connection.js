const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect("mongodb+srv://Mangesh:root@cluster0.cdcvq5k.mongodb.net/RegistrationApi",(err)=>
{
    if(!err)
        console.log("Mongodb Connection Succeeded...");
    else
        console.log("Connection Error: "+JSON.stringify(err,undefined,2));
    
});

module.exports=mongoose;

// mongodb://localhost:27017