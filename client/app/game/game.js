angular.module('wordpin.game', [])

.controller('GameController', function ($scope, $interval, Game, Letters, Word, ngDialog) {

  /****************************************
    PERSISTANT THROUGHOUT GAMES
  *****************************************/
  var gameTimer;
  $scope.timeleft = 0;
  $scope.max = 30;
  $scope.arrOfWords = [];
  // $scope.random = function(){
  //   return 0.5 - Math.random();
  // };

  $scope.loadDict = function() {
    $scope.stopTimer();
    // load dictionary if needed
    if (!$scope.dict) {
      Game.getValidWords().then(function(wordList) {
        $scope.dict = wordList.data;
        $scope.arrOfWords = Object.keys($scope.dict);
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
    $scope.timeleft = $scope.max;
    $scope.score = 0;
    $scope.validSubmissions = {};
    $scope.randword = ''
    $scope.word = '';

    // Timer.startTimer();
    $scope.startTimer();
    $scope.generateLetterSet();
  };

  $scope.startTimer = function() {
    gameTimer = $interval(function() {
      $scope.timeleft -= 1;
      $scope.updateTimerBar();
      if ($scope.timeleft === 0) {
        console.log('game over');
        $scope.stopTimer();
        $scope.modalOpen();
      }
    }, 1000);
  };

  $scope.stopTimer = function() {
    $interval.cancel(gameTimer);
  };

  /****************************************
    LETTERS
  *****************************************/

  // generate a letterset
  $scope.generateLetterSet = function() {
    $scope.letterSet = Letters.generateSet($scope.arrOfWords);
    Letters.shuffleLetters($scope.letterSet);
  };

  $scope.shuffleLetters = Letters.shuffleLetters;


  /****************************************
    TIMER
  *****************************************/
  $scope.updateTimerBar = function() {
    var type;
    if ($scope.timeleft < 10) {
      type = 'danger';
      // type = 'success';
    } else if ($scope.timeleft < 20) {
      type = 'warning';
      // type = 'info';
    } else if ($scope.timeleft < 30) {
      type = 'success';
      // type = 'warning';
    } else {
      type = 'success';
    }

    // $scope.dynamic = $scope.timeleft;
    $scope.type = type;
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

  /****************************************
    MODAL
  *****************************************/

  $scope.modalOpen = function() {
    ngDialog.open({
      // template: 'firstDialog',
      template: './app/templates/modal.html',
      scope: $scope,
      className: 'ngdialog-theme-default',
      closeByDocument: false
    });
  };

  // initialize game
  $scope.loadDict();
});

