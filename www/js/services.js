/**
 * Created by RBhochhibhoya on 12/25/2014.
 */
angular.module('scoreKeeper.services',[])

.service('ScoreBoard',function(Players){

        var rounds = [];


        this.getRound = function(id){
            return _.find(rounds,{id:id});
        };
        this.getAllRounds = function(){
            return rounds;
        };
        this.addNewRound = function(){
            var roundId = rounds.length+1;
            rounds.push({
                id:roundId,
                games:[{
                    id:1,
                    title:'Round '+roundId+" : Game 1",
                    players:Players.all()
                }]
            })
        };
        this.getGame = function(roundId,gameId){
            return _.find(_.find(rounds,{id:roundId}).games,{id:gameId});
        }

    });