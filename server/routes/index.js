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
router.post('/voting', function(req, res, next) {

  if (submissionArray.length >= 7) {
    res.render('index' , {
      title: 'Submissions',
      message: "You've submitted the maximum number of entries."
    });

  } else {
    var newSub = new Submission (req.body.name, req.body.url, req.body.image);
    submissionArray.push(newSub);
    console.log(submissionArray);
    res.render('voting', {
      entries: submissionArray
    });
    // res.json('voting', {
    //   message: "success",
    //   output: submissionArray
    // });
  }

  });

module.exports = router;
