const url = require('url');
const express = require("express");
const router = express.Router();
const { User } = require("../Models/user");
const auth = require('../Middlewares/auth');
const {paginateData} = require('../Utils/utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('aa4a1e51ffc144738f56a72dff3ba5e8');

// Get sources
router.get("/", [auth], async (req, res) => {
    // get query params
    const queryObject = url.parse(req.url,true).query;
    const { page = 1, pageSize = 20 } = queryObject;

    // get user Subscriptions
    const user = await User.findById(req.user._id);
    const subscriptions = user.subscriptions;
    // get sources
    await newsapi.v2.sources({
        language: 'en',
      }).then(response => {
          // paginate data
          const sources = paginateData(response.sources, page, pageSize);
          // map subscriptions
          const mappedSources = mapSourcesToSubscriptions(sources, subscriptions);
          return res.status(200).send({status: 200, data:{sources: mappedSources, totalCount:response.sources.length}})
        })
        .catch(err => res.status(400).send({status: 400, message: err}));
});
const mapSourcesToSubscriptions = (sources, subscriptions) => {
  const mappedSources = sources.map(source => ({
      ...source,
      isSubscribed: subscriptions.indexOf(source.id) === -1 ? false : true
  }));

  return mappedSources
}



module.exports = router;