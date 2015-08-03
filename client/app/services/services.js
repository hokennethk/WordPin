angular.module('wordpin.services', [])

.factory('Word', function() {

  var calculateScore = function(word) {
    var score = 0;
    if (word.length === 2) { score += 2; }
    else if (word.length === 3) { score += 3; }
    else if (word.length === 4) { score += 5; }
    else if (word.length === 5) { score += 8; }
    else if (word.length === 6) { score += 13; }
    else if (word.length === 7) { score += 21; }
    else if (word.length === 8) { score += 34; }
    else if (word.length >= 9) { score += 55; }
  };

  var verifyWord = function(word) {

  };

  return {
    calculateScore : calculateScore,
    verifyWord     : verifyWord
  };
})

.factory("Letters", function() {
  var vowels = 'aeiouy';
  var consonants = 'bcdfghjklmnpqrstvwxz';

  var generateNumVowels = function() {
    var numVowels = 0;
    while (numVowels < 3) {
      numVowels = Math.floor(Math.random() * 5);
    }
    return numVowels;
  };

  var generateNumConsonants = function(numVowels) {
    var maxLetters = 12;
    return maxLetters - numVowels;
  };

  var generateSet = function () {
    var vowelsArr = [];
    var consonantArr = [];
    var numVowels = generateNumVowels();
    var numConsonants = generateNumConsonants(numVowels);

    // get random vowels
    for (var i=0; i<numVowels; i++) {
      var rand = Math.floor(Math.random() * vowels.length);
      vowelsArr.push(vowels[rand]);
    }

    // get random consonants
    for (var i=0; i<numConsonants; i++) {
      var rand = Math.floor(Math.random() * consonants.length);
      consonantArr.push(consonants[rand]);
    }

    return (vowelsArr.concat(consonantArr));
  };

  return {
    generateSet : generateSet
  }

})

.factory("Game", function($http) {

  var getValidWords = function() {
    return $http.get('./data/dict.json').success(function(response) {
      console.log('WORDLIST LOADED', response)
      return response;
    });
  };

  var testWord = function (word, wordList) {
    return !!wordList[word];
  }


  return {
    getValidWords : getValidWords,
    testWord      : testWord
  }
});