const mongoose = require("mongoose");
const userSchema = new mongoose.Schema ({
 title: {
   type: String,
    required: true
    },

author:{
        type:Array,
        required: true
    },
pages:{
        type: String,
        required:true
    },

 year:{
        type: String,
        required: true
   },
});
module.exports = mongoose.model("User", userSchema);
