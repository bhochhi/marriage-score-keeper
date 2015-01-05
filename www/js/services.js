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

    })
    .factory('Players', function () {
        var players = [{
            name:"",
            show:false,
            points:0,
            earnings:0.00
        },{
            name:"",
            show:false,
            points:0,
            earnings:0.00
        },{
            name:"",
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
            },
            clean:function(){
                _.remove(players,function(player){return _.isEmpty(player.name);});
            },
            hasDuplicate:function(){
                return _
                    .uniq(players,function(player){ return player.name.toLowerCase()}).length < players.length;
            },
            removeDuplicates:function(){
                players = _
                    .uniq(players,function(player){ return player.name.toLowerCase()});
            }
        }
    })
    .service('SideMenu', function ($ionicSideMenuDelegate) {
        this.toggleSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .service('Popup', function ($ionicPopup) {
        this.confirm = function(title,template) {
            return $ionicPopup.confirm({
                title: title,
                template: template
            });
        };

        this.alert = function(title,template) {
            return $ionicPopup.alert({
                title: title,
                template: template
            })
        };
    })

;