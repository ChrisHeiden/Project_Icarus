var express = require('express');
var router = express.Router();

var Twit = require('twit');
var TagData =  require('./searchTag')
var data =  require('./plattformData')
var tagData = new TagData();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var T = new Twit(data.twitter);

  var param = 
  {
    q: tagData.getTag() + ' since:2011-07-11',
    count: 1000
  }   

  T.get('search/tweets', param, gotData);

  function gotData(err, data, response)
  {
    var tweet = data.statuses;
    res.json(tweet);
  }
});

module.exports = router;
