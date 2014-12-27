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

    });