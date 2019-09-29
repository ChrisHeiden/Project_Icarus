var express = require('express');
var router = express.Router();
const axios = require('axios');
var data =  require('./plattformData');
var TagData =  require('./searchTag');
var tagData = new TagData();


async function getGeneralData(){
    let result;
    result = await axios.get('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + data.flickr.api_key + '&tags=' + tagData.getTag() + '&format=json&nojsoncallback=1')
    return result;
}

async function getSpecificData(result, res, callback){
    var flickrSet = [];

    for (const item of result) {
        let response = await axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + data.flickr.api_key + '&photo_id=' + item.id + '&format=json&nojsoncallback=1')
        let flickrData = await response.data;
        flickrSet.push(flickrData);

    }
    callback(res, flickrSet);
}

function sendData(res, flickrSet){
    res.json(flickrSet);       
}

/* GET users listing. */
router.get('/', function(req, res) {
    let result = getGeneralData();
    result.then((response) => {
        result = response.data.photos.photo;
        getSpecificData(result, res, sendData);
    })
});

module.exports = router;