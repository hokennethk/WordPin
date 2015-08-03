angular.module('wordpin.game', [])

.controller('GameController', function ($scope, Game, Letters) {

  console.log('test')
  $scope.letterSet = [];
  $scope.score = 0;
  $scope.dict = undefined;
  Game.getValidWords().then(function(wordList) {
    $scope.dict = wordList.data;
  });
  // Game.getValidWords().success(function(results) {
  //   $scope.dict = results;
  // });

  // generate a letterset
  $scope.generateLetterSet = function() {
    $scope.letterSet = Letters.generateSet();
  };



  $scope.test = function(word) {
    // console.log($scope.dict);
    console.log(Game.testWord(word, $scope.dict));
  };


});