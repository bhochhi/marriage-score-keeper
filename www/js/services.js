/**
 * Created by RBhochhibhoya on 12/25/2014.
 */
angular.module('scoreKeeper.services',[])

.service('ScoreBoard',function(Players){

        var rounds = [];

        var activeRound;


        this.getRound = function(id){
            return _.find(rounds,{id:id});
        };
        this.getAllRounds = function(){
            return rounds;
        };
        this.addNewRound = function(){
            var roundId = rounds.length+1;
            activeRound = {
                id:roundId,
                games:[{
                    id:1,
                    players:angular.copy(Players.all()),
                    winner:''
                }]
            };
            rounds.push(activeRound)
        };
        this.getGame = function(roundId,gameId){
            return _.find(_.find(rounds,{id:roundId}).games,{id:gameId});
        };
        this.addNewGame=function(round){
            round.games.push({
                id:round.games.length+1,
                players:angular.copy(Players.all())
            })
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
            console.log(data);
          return data;
        };


        this.update =function(){
            _.each(ScoreBoard.getAllRounds(),function(round){
                _.each(round.games,function(game){
                    _.each(game.players,function(player){
                        console.log('update',player);
                        var playerSummary = _.find(data,{name:player.name})
                        if(!playerSummary){
                            playerSummary = angular.copy(newSummary);
                            playerSummary.name = player.name;
                        }
                        playerSummary.points+=player.points;
                        playerSummary.earnings+=player.earnings;
                    })
                })
            });

        };

    })
;