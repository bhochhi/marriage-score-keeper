/**
 * Created by RBhochhibhoya on 12/25/2014.
 */
angular.module('scoreKeeper.services', [])

    .service('ScoreBoard', function (Players) {
        var rounds = [];
        this.getAllRounds = function () {
            return rounds;
        };
        this.addNewRound = function () {
            var roundId = rounds.length + 1;
            var newRound = {
                id: roundId,
                games: [{
                    id: 1,
                    players: angular.copy(Players.all()),
                    winner: '',
                    totalPoints: 0,
                    isRunning:true
                }],
                addNextGame : function(currentRound){
                    var newGame = {
                        id: currentRound.games.length + 1,
                        players: angular.copy(Players.all()),
                        winner: '',
                        totalPoints: 0,
                        isRunning:true
                    };
                    this.games.push(newGame);
                },
                concluded:false
            };
            rounds.push(newRound)
        };
    })
    .service('Summary', function (ScoreBoard) {

        var newSummary = {
            name: '',
            points: 0,
            earnings: 0
        };

        var data = [];

        this.all = function () {
            return data;
        };

        //TODO: this is rigorous logic. We should try to refactor this with only adding last game that is to be updated.
        this.update = function () {
            data = [];
            _.each(ScoreBoard.getAllRounds(), function (round) {
                _.each(round.games, function (game) {
                    _.each(game.players, function (player) {
                        var playerSummary = _.find(data, {name: player.name});
                        if (!playerSummary) {
                            playerSummary = angular.copy(newSummary);
                            playerSummary.name = player.name;
                            data.push(playerSummary);
                        }
                        playerSummary.points += player.points;
                        playerSummary.earnings += player.earnings;
                    })
                })
            });

        };

    });