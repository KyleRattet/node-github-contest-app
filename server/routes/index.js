var express = require('express');
var router = express.Router();

//Submission Class Constructor
function Submission (githubName, githubURL, githubImage) {
  this.githubName = githubName;
  this.githubURL = githubURL;
  this.githubImage = githubImage || "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png";
  this.id = githubName;
  this.votes = 0;
  ///create unique id
  //votes counter
}

function sortSubmission (arrayMain, arrayEven, arrayOdd) {

  for (var i = 0; i < arrayMain.length; i++) {
    if(i % 2 === 0) {
      arrayEven.push(arrayMain[i]);
    } else arrayOdd.push(arrayMain[i]);
  }

}

function roundOneWinner (arrayEven, arrayOdd) {



  for (var i = 0; i < arrayEven.length; i++) {

    if (arrayEven[i].votes > arrayOdd[i].votes) {
      winnerEven.push(arrayEven[i]);
    } else winnerOdd.push(arrayOdd[i]);
  }

}

function roundTwoWinner (arrayEven, arrayOdd) {



  for (var i = 0; i < arrayEven.length; i++) {

    if (arrayEven[i].votes > arrayOdd[i].votes) {
      winnerEvenTwo.push(arrayEven[i]);
    } else winnerOddTwo.push(arrayOdd[i]);
  }

}

var submissionArray = [];
var submissionArrayEven = [];
var submissionArrayOdd = [];
var winnerEven = [];
var winnerOdd = [];
var winnerEvenTwo = [];
var winnerOddTwo = [];


var s1 = new Submission("s1", "1");
var s2 = new Submission("s2", "2");
var s3 = new Submission("s3", "1");
var s4 = new Submission("s4", "1");
var s5 = new Submission("s5", "1");
var s6 = new Submission("s6", "1");
var s7 = new Submission("s7", "1");
var s8 = new Submission("s8", "1");

var submissionArray = [s1, s2, s3, s4, s5, s6, s7, s8];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Submissions' });
});

//post to get entry submission, create a new Submission instance
router.post('/submit', function(req, res, next) {

  if (submissionArray.length <= 7) {
      var newSub = new Submission (req.body.name, req.body.url, req.body.image);
    submissionArray.push(newSub);
    // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
    res.render('index', {
      title: 'Submissions',
      message: submissionArray.length

    });
    console.log(submissionArray);

  } else {
    sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
    res.render('voting', {
      even: submissionArrayEven,
      odd: submissionArrayOdd
    });
  }

  });

router.post('/vote/:id', function(req, res, next) {

  //find submission to update
  // console.log(req.params.id, "req params ID");
  // console.log(submissionArray[0].id, "submission array id");
  // console.log(submissionArray, "all sub array");
  // console.log(submissionArrayEven, "even sub array");
  // console.log(submissionArrayOdd, "odd sub array");

  for (var i = 0; i < submissionArray.length; i++) {
    if(submissionArray[i].id === req.params.id) {
      submissionArray[i].votes += 1;
    }
  }



});

router.post('/results', function(req, res, next) {
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  // roundOneWinner(submissionArrayEven, submissionArrayOdd);
  res.render('results', {
    title: 'Round One Results',
    evenTally: submissionArrayEven,
    oddTally: submissionArrayOdd
  });

});

router.post('/roundTwo', function(req, res, next) {
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  roundOneWinner(submissionArrayEven, submissionArrayOdd);

  res.render('roundTwo', {
      title: "Round Two",
      evenTally: winnerEven,
      oddTally: winnerOdd
    });
});

router.post('/voteTwo/:id', function(req, res, next) {
  // roundOneWinner(submissionArrayEven, submissionArrayOdd);
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  for (var i = 0; i < submissionArray.length; i++) {
    if(submissionArray[i].id === req.params.id) {
      submissionArray[i].votes += 1;
    }
  }
});

router.post('/resultsRoundTwo', function(req, res, next) {
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  res.render('resultsRoundTwo', {
    title: 'Round Two Results',
    evenTally: winnerEven,
    oddTally: winnerOdd
  });
});

router.post('/roundThree', function(req, res, next) {
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  roundTwoWinner(winnerEven, winnerOdd);
  res.render('roundThree', {
      title: "Final Round",
      evenTally: winnerEvenTwo,
      oddTally: winnerOddTwo
    });
});

router.post('/voteThree/:id', function(req, res, next) {
  // roundOneWinner(submissionArrayEven, submissionArrayOdd);
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  for (var i = 0; i < submissionArray.length; i++) {
    if(submissionArray[i].id === req.params.id) {
      submissionArray[i].votes += 1;
    }
  }
});

router.post('/resultsRoundThree', function(req, res, next) {
  // sortSubmission(submissionArray, submissionArrayEven, submissionArrayOdd);
  if (winnerEvenTwo[0].votes > winnerOddTwo[0].votes) {
    winner = winnerEvenTwo[0].githubName;
  } else winner = winnerOddTwo[0].githubName;

  res.render('resultsRoundThree', {
    title: 'Final Round',
    evenTally: winnerEvenTwo,
    oddTally: winnerOddTwo,
    winner: winner
  });
});


module.exports = router;
