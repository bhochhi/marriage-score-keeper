angular.module('scoreKeeper.controllers', [])
    .controller('AppCtrl', function ($scope) {

    })
    .controller('PlayersCtrl', function ($scope, Players, SideMenu) {
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
    .factory('Rules', function () {
        return {
            central: true,
            point: 10,
            lostWithoutShow: 10,
            lostWithShow: 3,
            murder: false
        }
    })
    .controller('RulesCtrl', function ($scope, Rules, SideMenu) {
        $scope.rules = Rules;
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
    })
    .controller('ScoreBoardCtrl', function ($scope, SideMenu, $state, ScoreBoard,$ionicModal) {
        $ionicModal.fromTemplateUrl('game.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });


        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
        $scope.summary = function () {
            $state.go('app.summary', {});
        };

        $scope.newRound = function () {
            ScoreBoard.addNewRound();
        };

        $scope.rounds = ScoreBoard.getAllRounds();

        $scope.toggleRound = function (round) {
            if ($scope.isRoundShown(round)) {
                $scope.shownRound = null;
            } else {
                $scope.shownRound = round;
            }
        };
        $scope.isRoundShown = function (round) {
            return $scope.shownRound === round;
        };

        $scope.displayGame =  function(roundId,gameId){
            $scope.displayedGame = ScoreBoard.getGame(roundId,gameId);
            $scope.modal.show();
        }

    })
    .controller('SummaryCtrl', function ($scope) {
        $scope.data = [
            {
                name: 'Shriyan',
                chips: -20,
                earnings: -2
            },
            {
                name: 'Rupesh',
                chips: 30,
                earnings: 3
            }, {
                name: 'Amir',
                chips: 30,
                earnings: 3
            }, {
                name: 'Samir',
                chips: -40,
                earnings: -4
            }
        ]
    });