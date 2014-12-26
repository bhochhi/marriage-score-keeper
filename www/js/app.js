angular.module('scoreKeeper', ['ionic','scoreKeeper.controllers','scoreKeeper.services'])
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
                        templateUrl: "game.html",
                        controller:"GameCtrl"
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
            name: 'Rupesh'
        }, {
            name: 'Samir'
        }, {
            name: 'Amir'
        }
        ];

        return {
            all: function () {
                return players;
            },
            addPlayer: function (player) {
                players.push(player);
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