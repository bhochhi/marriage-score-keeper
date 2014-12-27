angular.module('scoreKeeper', ['ionic', 'scoreKeeper.controllers', 'scoreKeeper.services'])
    .constant('_', window._)
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "menu.html",
                controller: "AppCtrl"
            })
            .state('app.players', {
                url: "/players",
                views: {
                    'menuContent': {
                        templateUrl: "players.html",
                        controller: "PlayersCtrl"
                    }
                }
            })
            .state('app.rules', {
                url: "/rules",
                views: {
                    'menuContent': {
                        templateUrl: "rules.html",
                        controller: "RulesCtrl"
                    }
                }
            })
            .state('app.scoreboard', {
                url: "/scoreboard",
                views: {
                    'menuContent': {
                        templateUrl: "score-board.html",
                        controller: "ScoreBoardCtrl"
                    }
                }
            })
            .state('app.game', {
                url: "/game/:roundId/:gameId",
                views: {
                    'menuContent': {
                        templateUrl: "game.html"
                    }
                }
            })
            .state('app.summary', {
                url: "/summary",
                views: {
                    'menuContent': {
                        templateUrl: "summary.html",
                        controller: "SummaryCtrl"
                    }
                }
            });


        $urlRouterProvider.otherwise('/app/players');
    })
    .factory('Players', function () {
        var players = [{
            name:"rupesh",
            show:false,
            points:0,
            earnings:0.00
        },{
            name:"Amir",
            show:false,
            points:0,
            earnings:0.00
        },{
            name:"Samir",
            show:false,
            points:0,
            earnings:0.00
        }];

        var player = {
            name: '', //unique
            show:false,
            points:0,
            earnings:0.00
        };

        return {
            all: function () {
                return players;
            },
            addPlayer: function () {
                players.push(angular.copy(player));
            },
            removePlayer: function (index) {
                players.splice(index, 1);
            }

        }
    })
    .service('SideMenu', function ($ionicSideMenuDelegate) {
        this.toggleSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    });