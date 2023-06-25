const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"],
    },
    useremail:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email address already taken"]
    },
    // userphone:{
    //     type:String,
    //     required:[true,"Please add the user phone number"]
    // },
    userpassword:{
        type:String,
        required:[true,"Please add the password number"]
    },


},{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);