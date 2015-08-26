var express = require('express');
var router = express.Router();

//Submission Class Constructor
function Submissions (githubName, githubURL, githubImage) {
  this.githubName = githubName;
  this.githubURL = githubURL;
  this.githubImage = githubImage;
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
