var express = require('express');
var tumblr = require('tumblr.js');
var router = express.Router();

var TagData =  require('./searchTag')
var data =  require('./plattformData')

var tagData = new TagData();


/* GET users listing. */
router.get('/', function(req, res, next) {

    let tumblrRes;

    const client = tumblr.createClient({
        credentials: data.tumblr,
        returnPromises: true,
    });


    // Make the request
    client.taggedPosts(tagData.getTag(), gotData);

    function gotData(err, data, response)
    {
        tumblrRes = data;
        res.json(tumblrRes);
    }
});

module.exports = router;