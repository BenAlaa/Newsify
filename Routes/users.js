const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const auth = require('../Middlewares/auth');
const { User, validate } = require("../Models/user");

// Get one user..
router.get("/:id", [auth], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send({status:404, message: "The User with the given ID was not found."});
    const user = await User.findById(req.params.id).select('-password');
    if (!user)  return res.status(404).send({status:404, message: "The User with the given ID was not found."});
    res.status(200).send({status: 200, data: user});
});

// Register User
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({status:400, message: error.details[0].message});
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({status:400, message:"User already registered"});
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken(); 
    res.header('x-auth-token',token)
        .header("access-control-expose-headers","x-auth-token")
        .status(200)
        .send({status:200, data: user, message: "User Regesterd Successfully"});
});

module.exports = router;
