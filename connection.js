const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1:27017/RegistrationApi",(err)=>
{
    if(!err)
        console.log("Mongodb Connection Succeeded...");
    else
        console.log("Connection Error: "+JSON.stringify(err,undefined,2));
    
});

module.exports=mongoose;

// mongodb://localhost:27017