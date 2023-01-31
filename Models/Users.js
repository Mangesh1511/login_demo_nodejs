const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
            // _id:mongoose.Types.ObjectId,
            email:String,
            password: String
        });
 

 
module.exports = mongoose.model("Users", userSchema);
