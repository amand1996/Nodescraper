var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/webscrape', function(req, res){
  console.log("Entered back-end");
  URL = "http://www.buzzfeed.com";
  result = "";

request(URL, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div.col1 > ul > li.grid-posts__item').each(function( index ) {
    var title = $(this).find('h2 > a').text().trim();
    var author = $(this).find('div.small-meta > div:nth-child(1) > a').text().trim();
    var responses = $(this).find('div.small-meta > div:nth-child(3) > a').text();
    result = result + title + "<br>";
    result = result + author + "<br>";
    result = result + responses + "<br>";
    if(index == 10){
      res.send(result);
    }
  });
});

});

module.exports = router;
