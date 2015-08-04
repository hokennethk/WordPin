angular.module('wordpin', [
  'wordpin.game',
  'wordpin.services',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate'
  ])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/game");

  $stateProvider
    .state('welcome', {
      url: '/'
      // templateUrl: 'app/templates/welcome.html',
    })
    .state('game', {
      url:'/game',
      templateUrl: 'app/templates/game.html',
      controller: 'GameController'
    })
    .state('highscores', {
      url: '/highscores',
      templateUrl: 'app/templates/highscores.html'
    });
});