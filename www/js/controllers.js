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
    .controller('ScoreBoardCtrl', function ($scope, SideMenu, $state, ScoreBoard,$ionicModal,Rules,Players) {
        $ionicModal.fromTemplateUrl('game.html', {
            scope: $scope
        })
            .then(function(modal) {
            $scope.modal = modal;
        });


        $scope.toggleSideMenu = SideMenu.toggleSideMenu;
        $scope.summary = function () {
            $state.go('app.summary', {});
        };

        $scope.newRound = function () {
            ScoreBoard.addNewRound();
            $scope.activeRound = $scope.rounds[$scope.rounds.length-1]
        };


        $scope.rounds = ScoreBoard.getAllRounds();

        $scope.disableNewRound = function(){
            return  $scope.rounds.length > 0;// || $scope.activeRound.games.length<Players.all().length;
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

        $scope.displayGame =  function(round,game){
            $scope.displayedGame = game;
            $scope.displayedRound = round;
            $scope.modal.show();
        };

        $scope.nextGame = function(round){
            ScoreBoard.addNewGame(round);
        };
        $scope.totalPoints = 0;

        $scope.settleGame = function() {
            var players = $scope.displayedGame.players;
            var numberOfPlayers = players.length;
            var totalPoints = 0;
            _.each(players,function(player){
                totalPoints+=player.points;
            });
            $scope.totalPoints = totalPoints;

            _.each(players,function(player){
               if($scope.displayedGame.winner !==player.name) {
                   var looserPenaltyPoints = player.show?Rules.lostWithShow:Rules.lostWithoutShow;
                       var totalDebitedPoints = ($scope.totalPoints+looserPenaltyPoints);
                       var totalCreditedPoints = (numberOfPlayers*player.points);
                       var totalEarningPoints = totalCreditedPoints - totalDebitedPoints;
                       player.earnings = (totalEarningPoints*Rules.costPerpoint)/100;
               }
            });
            var winner = _.find(players,{name:$scope.displayedGame.winner});
            var winnerEarning = 0.0;
            _.each(players,function(player){
                if($scope.displayedGame.winner !==player.name)
                    winnerEarning +=(player.earnings)
            });
            winner.earnings=-1*winnerEarning;
        };

        $scope.newRound();

    })
    .controller('SummaryCtrl', function ($scope) {
        $scope.data = [
            {
                name: 'Shriyan',
                points: -20,
                earnings: -2
            },
            {
                name: 'Rupesh',
                points: 30,
                earnings: 3
            }, {
                name: 'Amir',
                points: 30,
                earnings: 3
            }, {
                name: 'Samir',
                points: -40,
                earnings: -4
            }
        ]
    });