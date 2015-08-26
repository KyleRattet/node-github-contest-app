var express = require('express');
var router = express.Router();

//Submission Class Constructor
function Submission (githubName, githubURL, githubImage) {
  this.githubName = githubName;
  this.githubURL = githubURL;
  this.githubImage = githubImage;
}

var submissionArray = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Submissions' });
});

//post to get entry submission, create a new Submission instance
router.post('/submit', function(req, res, next) {

  if (submissionArray.length >= 1) {
    res.render('index' , {
      message: "You've submitted the maximum number of entries."
    });
    console.log('too many entries');

  } else {
  var newSub = new Submission (req.body.name, req.body.url, req.body.image);
  submissionArray.push(newSub);
  console.log(submissionArray);
  }

});

module.exports = router;
