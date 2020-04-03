const url = require('url');
const express = require("express");
const router = express.Router();
const auth = require('../Middlewares/auth');
const {paginateData} = require('../Utils/utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('aa4a1e51ffc144738f56a72dff3ba5e8');

// Get News
router.get("/", [auth], async (req, res) => {
    // get query params
    const queryObject = url.parse(req.url,true).query;
    const { page = 1, pageSize = 20 } = queryObject;

    // get subscriped news
    await newsapi.v2.sources({
        language: 'en',
      }).then(response => {
          // paginate data
          const data = paginateData(response.sources, page, pageSize);
          return res.status(200).send({status: 200, data})
        })
        .catch(err => res.status(400).send({status: 400, message: err}));
});



module.exports = router;