var express = require('express');
var router = express.Router();

//Submission Class Constructor
function Submission (githubName, githubURL, githubImage) {
  this.githubName = githubName;
  this.githubURL = githubURL;
  this.githubImage = githubImage;
}

function sortSubmission (arrayMain, arrayEven, arrayOdd) {

  for (var i = 0; i < arrayMain.length; i++) {
    if(i % 2 === 0) {
      arrayEven.push(arrayMain[i]);
    } else arrayOdd.push(arrayMain[i]);
  }

}

var submissionArray = [];
var submissionArrayEven = [];
var submissionArrayOdd = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Submissions' });
});

//post to get entry submission, create a new Submission instance
router.post('/voting', function(req, res, next) {

  if (submissionArray.length <= 3) {
      var newSub = new Submission (req.body.name, req.body.url, req.body.image);
    submissionArray.push(newSub);
    // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
    console.log(submissionArray, "submission array");
    console.log(submissionArrayEven, "even array");
    console.log(submissionArrayOdd, "odd array");


  } else {
    sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
    res.render('voting', {
      even: submissionArrayEven,
      odd: submissionArrayOdd
    });
  }

  });



module.exports = router;
