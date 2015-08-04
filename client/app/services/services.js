angular.module('wordpin.services', [])

.factory('Word', function() {

  var calculateScore = function(word) {
    var score = 0;
    if (word.length === 2) { score += 2; }
    else if (word.length === 3) { score += 3; }
    else if (word.length === 4) { score += 5; }
    else if (word.length === 5) { score += 8; }
    else if (word.length === 6) { score += 12; }
    else if (word.length === 7) { score += 17; }
    else if (word.length === 8) { score += 23; }
    else if (word.length >= 9) { score += 30; }
    return score;
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

  var checkSubset = function(arr1, arr2) {
    // if (array === undefined || !Array.isArray(array)) {
    //   return null;
    // }
    var superMap = {};
    var result = true;

    // map superset
    arr2.forEach(function(item) {
      if (!superMap[item]) {
        superMap[item] = 0;
      }
      superMap[item] += 1;
    });

    // check if subset item in superset map
    for (var i=0; i<arr1.length; i++) {
      var item = arr1[i];
      if (!superMap.hasOwnProperty(item)) {
        return false;
      } else {
        superMap[item] -= 1;
        if (superMap[item] < 0) {
          return false;
        }
      }
    }
    // arr1.forEach(function(item) {
    //   if (!superMap.hasOwnProperty(item)) {
    //     result = false;
    //   } else {
    //     superMap[item] -= 1;
    //   }
    // });
    return result;
  };

  var testWord = function (word, wordList) {
    return !!wordList[word];
  };

  return {
    getValidWords : getValidWords,
    checkSubset   : checkSubset,
    testWord      : testWord
  }
});