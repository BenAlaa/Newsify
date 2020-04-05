const url = require('url');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require('../Middlewares/auth');
const { User } = require("../Models/user");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('aa4a1e51ffc144738f56a72dff3ba5e8');

// Get News
router.get("/", [auth], async (req, res) => {
    // get query params
    const queryObject = url.parse(req.url,true).query;
    const { page = 1, pageSize = 20 } = queryObject;
    if(page <= 0) return res.status(400).send({status: 400, message: 'invalid page number, should start with 1'});

    // get current user
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send({status:404, message: "The User with the given ID was not found."});
    const user = await User.findById(userId).select('-password');
    if (!user)  return res.status(404).send({status:404, message: "The User with the given ID was not found."});

    if (user.subscriptions.length === 0) return res.send({status:200, data: [], message: "User had not subscribe to any source"});
    // get user subscriptions
    const sources = user.subscriptions.toString();

    // get subscriped news
    await newsapi.v2.everything({
        sources: sources,
        language: 'en',
        page,
        pageSize,
      }).then(response => {
          res.status(200).send({status: 200, data: response})
        })
        .catch(err => res.status(400).send({status: 400, message: err}));
});

module.exports = router;

