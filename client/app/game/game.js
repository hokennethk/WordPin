angular.module('wordpin.game', [])

.controller('GameController', function ($scope, Game, Letters) {

  $scope.initialize = function() {
    $scope.letterSet = [];
    $scope.score = 0;
    $scope.validSubmissions = {};
    if (!$scope.dict) {
      Game.getValidWords().then(function(wordList) {
        $scope.dict = wordList.data;
      });
    }

    $scope.generateLetterSet();
    $scope.randword = ''
  };


  // generate a letterset
  $scope.generateLetterSet = function() {
    $scope.letterSet = Letters.generateSet();
  };

  $scope.checkSubset = function(input, letters) {
    input = input.split('');
    return Game.checkSubset(input, letters);
  };

  $scope.validWord = function(word) {
    // console.log($scope.dict);
    var result =  !$scope.validSubmissions[word] &&
                  Game.checkSubset(word.split(''), $scope.letterSet) &&
                  Game.testWord(word, $scope.dict)
    if (result) {$scope.validSubmissions[word] = word;}
    $scope.word = '';
    console.log(result);
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
  $scope.initialize();
});