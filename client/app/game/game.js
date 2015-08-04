angular.module('wordpin.game', [])

.controller('GameController', function ($scope, $interval, Game, Letters, Word) {
  var gameTimer;

  $scope.loadDict = function() {
    // $scope.stopTimer();
    // load dictionary if needed
    if (!$scope.dict) {
      Game.getValidWords().then(function(wordList) {
        $scope.dict = wordList.data;
      });
    }

  };


  /****************************************
    GAME
  *****************************************/
  $scope.startGame = function() {
    // game variables
    if (gameTimer) {
      $scope.stopTimer();
    }
    $scope.letterSet = [];
    $scope.timeleft = 10;
    $scope.score = 0;
    $scope.validSubmissions = {};
    $scope.randword = ''

    $scope.startTimer();
    $scope.generateLetterSet();
  };

  $scope.startTimer = function() {
    gameTimer = $interval(function() {
      $scope.timeleft -= 1;
      if ($scope.timeleft === 0) {
        console.log('game over');
        $scope.stopTimer();
      }
    }, 1000);
  };

  $scope.stopTimer = function() {
    $interval.cancel(gameTimer);
  };

  // generate a letterset
  $scope.generateLetterSet = function() {
    $scope.letterSet = Letters.generateSet();
  };


  /****************************************
    CHECK WORD
  *****************************************/
  $scope.checkSubset = function(input, letters) {
    input = input.split('');
    return Game.checkSubset(input, letters);
  };

  $scope.validWord = function(word) {
    var result =  !$scope.validSubmissions[word] &&
                  Game.checkSubset(word.split(''), $scope.letterSet) &&
                  Game.testWord(word, $scope.dict)
    if (result) {
      $scope.validSubmissions[word] = word;
      $scope.score += Word.calculateScore(word);
    }
    $scope.word = '';
    console.log($scope.score);
    return result;
  };

  // maybe use this to generate letter set....
  $scope.randomWord = function() {
    var randword = '';
    var keys = Object.keys($scope.dict);
    while (randword.length < 12) {
      console.log('keys', keys.length)
      var index = Math.floor(Math.random() * keys.length);
      console.log('index', index)
      randword = keys[index];
      console.log('randword', randword)
    }
    $scope.randword = randword;
    $scope.letterSet = randword.split('')
    return randword;
  }


  // initialize game
  $scope.loadDict();
});