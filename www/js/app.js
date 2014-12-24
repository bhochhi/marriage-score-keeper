angular.module('score-keeper', ['ionic'])
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
                        controller:"RulesCtrl"
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
    .service('SideMenu',function($ionicSideMenuDelegate){
        this.toggleSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .controller('AppCtrl', function ($scope) {

    })
    .controller('PlayersCtrl', function ($scope, Players,SideMenu) {
        $scope.players = Players.all();
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;




        $scope.removePlayer = function (index) {
            Players.removePlayer(index);
        };

        $scope.addPlayer = function () {
            if ($scope.showDelete) {
                $scope.showDelete = !$scope.showDelete;
            }
            Players.addPlayer({
                name: ''
            });
        };
    })
    .factory('Rules',function(){
        return {
            central:true,
            perPoint:10,
            lostWithoutShow:10,
            lostWithShow:3,
            murder:false
        }
    })
    .controller('RulesCtrl',function($scope,Rules,SideMenu){
        $scope.rules = Rules;
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
    })
    .controller('ScoreBoardCtrl',function($scope,SideMenu){
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
        $scope.summary = function(){
            console.log('summary clicked');
        }

    })
;
