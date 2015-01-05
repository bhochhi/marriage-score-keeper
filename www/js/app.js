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
                },
                onExit:function(Players,$state,Popup){
                    Players.clean();
                    if(Players.hasDuplicate()){
                        Popup
                            .confirm("Duplicate Player names","do you want to remove duplicates?")
                            .then(function(ok) {
                            if(ok) {
                                Players.removeDuplicates();
                            } else {
                                $state.go('app.players');
                            }
                        });
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
    });