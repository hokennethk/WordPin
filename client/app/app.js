angular.module('wordpin', [
  'wordpin.game',
  'wordpin.services',
  // 'wordpin.game.timer',
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
    .state('game.timer', {
      // url: '/game',
      templateUrl:'app/templates/game.timer.html',
      controller: 'TimerController'
    })
    .state('highscores', {
      url: '/highscores',
      templateUrl: 'app/templates/highscores.html'
    });
});