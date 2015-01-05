angular.module('scoreKeeper.controllers', [])
    .controller('AppCtrl', function ($scope,ScoreBoard) {
        $scope.resetScoreBoard = function(){
            console.log("reset clicked");
            ScoreBoard.reset();
        }
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
            costPerPoint: 10,
            lostWithoutShow: 10,
            lostWithShow: 3,
            murder: false
        }
    })
    .controller('RulesCtrl', function ($scope, Rules, SideMenu) {
        $scope.rules = Rules;
        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
    })
    .controller('ScoreBoardCtrl', function ($scope, $ionicListDelegate, Players, SideMenu,$stateParams, $state, ScoreBoard, $ionicModal, Rules, Summary, Popup) {

        $ionicModal.fromTemplateUrl('game.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.reset = function(){
            Popup.confirm("Reset ScoreBoard","Are you sure you want to start fresh?")
                .then(function(res){
                    if(res){
                        ScoreBoard.reset();
                        Summary.reset();
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                });
        };

        $scope.toggleSideMenu = SideMenu.toggleSideMenu;

        $scope.summary = function () {
            $state.go('app.summary', {});
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

        $scope.displayGame = function (round, game) {
            Players.clean();
            if (game.isRunning) {
                var activePlayers = Players.all();
                if (activePlayers.length < 2) {
                    Popup.alert("Insufficient Players", "At least two Players needed!!").then(function (res) {
                        $state.go('app.players', {});
                    });
                } else {
                    if (!_.isEqual(game.players, activePlayers)) {
                        game.players = angular.copy(activePlayers);
                    }
                    $scope.currentGame = game;
                    $scope.currentRound = round;
                    $scope.modal.show();
                }
            } else {
                $scope.currentGame = game;
                $scope.currentRound = round;
                $scope.modal.show();
            }
        };

        $scope.updateGame = function (currentGame, currentRound) {
            var players = currentGame.players;
            var numberOfPlayers = players.length;
            var totalPoints = 0;
            _.each(players, function (player) {
                totalPoints += player.points;
            });

            currentGame.totalPoints = totalPoints;

            _.each(players, function (player) {
                if (currentGame.winner.name !== player.name) {
                    var looserPenaltyPoints = player.show ? Rules.lostWithShow : Rules.lostWithoutShow;
                    var totalDebitedPoints = (currentGame.totalPoints + looserPenaltyPoints);
                    var totalCreditedPoints = (numberOfPlayers * player.points);
                    var totalEarningPoints = totalCreditedPoints - totalDebitedPoints;
                    player.earnings = (totalEarningPoints * Rules.costPerPoint) / 100;
                }
            });

            var winnerEarning = 0.0;
            _.each(players, function (player) {
                if ($scope.currentGame.winner.name !== player.name)
                    winnerEarning += (player.earnings)
            });
            currentGame.winner.earnings = -1 * winnerEarning;
            Summary.update();
            if (currentGame.isRunning) {
                currentGame.isRunning = false;
                if (currentRound.games.length >= currentGame.players.length) {
                    currentRound.concluded = true;
                    ScoreBoard.addNewRound();
                }
                else {
                    currentRound.addNextGame(currentRound);
                }
            }
        };

        $scope.$watch('currentGame.winner', function (newVal, oldVal) {
            if (newVal) {
                newVal.show = true;
            }
            if (oldVal) {
                oldVal.show = false;
            }

        })

        function isCurrentRoundConcluded() {
            return $scope.rounds.length == 0 || $scope.rounds[$scope.rounds.length - 1].concluded;
        }

        if (isCurrentRoundConcluded()) {
            ScoreBoard.addNewRound();
        }
    })
    .controller('SummaryCtrl', function ($scope, Summary) {
        $scope.data = Summary.all();
    });