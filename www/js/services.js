/**
 * Created by RBhochhibhoya on 12/25/2014.
 */
angular.module('scoreKeeper.services',[])

.service('ScoreBoard',function(Players){

        var rounds = [];

        var activeRound;


        this.getAllRounds = function(){
            return rounds;
        };
        this.addNewRound = function(){
            var roundId = rounds.length+1;
            activeRound = {
                id:roundId,
                disableNextGame:false,
                games:[{
                    id:1,
                    players:angular.copy(Players.all()),
                    winner:'',
                    totalPoints:0
                }]
            };
            rounds.push(activeRound)
        };
        this.getGame = function(roundId,gameId){
            return _.find(_.find(rounds,{id:roundId}).games,{id:gameId});
        };
        this.addNewGame=function(round){
            console.log('round add game');
            var newGame = {
                id:round.games.length+1,
                players:angular.copy(Players.all())
            };
            round.games.push(newGame);
        }

    })
    .service('Summary',function(ScoreBoard){

        var newSummary = {
            name: '',
            points: 0,
            earnings: 0
        };

        var data =  [];

        this.all = function(){
          return data;
        };

        //TODO: this is rigorous logic. We should try to refactor this with only adding last game that is to be updated.
        this.update =function(){
            data = [];
            _.each(ScoreBoard.getAllRounds(),function(round){
                _.each(round.games,function(game){
                    _.each(game.players,function(player){
                        var playerSummary = _.find(data,{name:player.name});
                        if(!playerSummary){
                            playerSummary = angular.copy(newSummary);
                            playerSummary.name = player.name;
                            data.push(playerSummary);
                        }
                        playerSummary.points+=player.points;
                        playerSummary.earnings+=player.earnings;
                    })
                })
            });

        };

    })
;