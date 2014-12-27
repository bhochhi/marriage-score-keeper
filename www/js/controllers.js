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
            Players.addPlayer();
        };
    })
    .factory('Rules', function () {
        return {
            central: true,
            costPerpoint: 10,
            lostWithoutShow: 10,
            lostWithShow: 3,
            murder: false
        }
    })
    .controller('RulesCtrl', function ($scope, Rules, SideMenu) {
        $scope.rules = Rules;
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
    })
    .controller('ScoreBoardCtrl', function ($scope, SideMenu, $state, ScoreBoard, $ionicModal, Rules, Summary) {
        $ionicModal.fromTemplateUrl('game.html', {
            scope: $scope
        })
            .then(function (modal) {
                $scope.modal = modal;
            });


        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
        $scope.summary = function () {
            $state.go('app.summary', {});
        };

        $scope.newRound = function () {
            ScoreBoard.addNewRound();
            $scope.activeRound = $scope.rounds[$scope.rounds.length - 1]
        };


        $scope.rounds = ScoreBoard.getAllRounds();

        $scope.disableNewRound = function () {
            return $scope.rounds.length > 0;// || $scope.activeRound.games.length<Players.all().length;
        };

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

        $scope.displayGame = function (round, game) {
            $scope.currentGame = game;
            $scope.currentRound = round;
            $scope.modal.show();
        };

        $scope.nextGame = function (round) {
            ScoreBoard.addNewGame(round);
        };
        $scope.totalPoints = 0;

        $scope.settleGame = function () {
            var players = $scope.currentGame.players;
            var numberOfPlayers = players.length;
            var totalPoints = 0;
            _.each(players, function (player) {
                totalPoints += player.points;
            });
            $scope.totalPoints = totalPoints;

            _.each(players, function (player) {
                if ($scope.currentGame.winner.name !== player.name) {
                    var looserPenaltyPoints = player.show ? Rules.lostWithShow : Rules.lostWithoutShow;
                    var totalDebitedPoints = ($scope.totalPoints + looserPenaltyPoints);
                    var totalCreditedPoints = (numberOfPlayers * player.points);
                    var totalEarningPoints = totalCreditedPoints - totalDebitedPoints;
                    player.earnings = (totalEarningPoints * Rules.costPerpoint) / 100;
                }
            });

            var winnerEarning = 0.0;
            _.each(players, function (player) {
                if ($scope.currentGame.winner.name !== player.name)
                    winnerEarning += (player.earnings)
            });
            $scope.currentGame.winner.earnings = -1 * winnerEarning;

            Summary.update();
        };



        $scope.$watch('currentGame.winner', function (newVal, oldVal) {
            if(newVal){
                newVal.show = true;
                oldVal.show = false;
            }
        });

    })
    .controller('SummaryCtrl', function ($scope,Summary) {
        $scope.data = Summary.all();
    });