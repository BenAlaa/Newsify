const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require('../Middlewares/auth');
const { User } = require("../Models/user");

// Subscribe and unsibscribe
router.put("/switch",[auth], async (req, res) => {
  
    const userId = req.user._id;
    // check if user id is valid
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send({status:404, message: "The User with the given ID was not found."});

    
    // get current user
    const user = await User.findById(userId).select('-password');
    if (!user)  return res.status(404).send({status:404, message: "The User with the given ID was not found."});
    
    // get source
    const source = req.body.source; 
    if (!source)  return res.status(404).send({status:404, message: "The source not valid.."});
    
    // handel Subscription
    const message = user.handleSubcription(source);
    await user.save();
    return res.status(200).send({status: 200, data: user, message})
});



module.exports = router;