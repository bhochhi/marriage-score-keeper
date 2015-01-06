/**
 * Created by RBhochhibhoya on 12/25/2014.
 */
angular.module('scoreKeeper.services', [])

    .service('ScoreBoard', function (Players) {
        var rounds;

        this.reset = function () {
            rounds.length = 0;
        };

        this.getAllRounds = function () {
            if (!rounds) {
                var cachedRounds = window.localStorage['rounds'];
                if (cachedRounds) {
                    rounds = angular.fromJson(cachedRounds);
                }
                else {
                    rounds = [];
                }
            }
            return rounds;
        };
        this.addNextGame = function(round){
            var newGame = {
                id: round.games.length + 1,
                players: angular.copy(Players.all()),
                winner: '',
                totalPoints: 0,
                isRunning: true
            };
            round.games.push(newGame);
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
                    isRunning: true
                }],
                concluded: false
            };
            rounds.push(newRound)
        };

        this.updateLocalStorage = function () {
            window.localStorage['rounds'] = angular.toJson(rounds);
        }
    })
    .service('Summary', function (ScoreBoard) {
        var newSummary = {
            name: '',
            points: 0,
            earnings: 0
        };

        var data;

        this.reset = function () {
            data = [];
        };
        this.all = function () {
            if (!data) {
                var cacheData = window.localStorage['data'];
                if (cacheData) {
                    data = angular.fromJson(cacheData);
                }
                else {
                    data = [];
                }
            }
            return data;
        };
        this.updateCache = function () {
            window.localStorage['data'] = angular.toJson(data);
        };

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
        var master = [{
            name: "",
            show: false,
            points: 0,
            earnings: 0.00
        }, {
            name: "",
            show: false,
            points: 0,
            earnings: 0.00
        }, {
            name: "",
            show: false,
            points: 0,
            earnings: 0.00
        }];
        var players;

        var player = {
            name: '', //TODO: make it unique while fillin instead of checking latter.
            show: false,
            points: 0,
            earnings: 0.00
        };

        function updateLocalStorage() {
            window.localStorage['players'] = angular.toJson(players);
        }

        return {
            all: function () {
                if (!players) {
                    var cachePlayers = window.localStorage['players'];
                    if (cachePlayers) {
                        players = angular.fromJson(cachePlayers);
                    } else {
                        players = angular.copy(master);
                    }
                }
                return players;
            },
            addPlayer: function () {
                players.push(angular.copy(player));
            },
            removePlayer: function (index) {
                players.splice(index, 1);
            },
            clean: function () {
                _.remove(players, function (player) {
                    return _.isEmpty(player.name);
                });
            },
            hasDuplicate: function () {
                return _
                        .uniq(players, function (player) {
                            return player.name.toLowerCase()
                        }).length < players.length;
            },
            removeDuplicates: function () {
                players = _
                    .uniq(players, function (player) {
                        return player.name.toLowerCase()
                    });
            },
            updateCache: function () {
                updateLocalStorage();
            },
            reset:function(){
                players = [];
            }
        }
    })
    .factory('Rules', function () {
        var rules;
        var cachedRules = window.localStorage['rules'];
        if (cachedRules) {
            rules = angular.fromJson(cachedRules);
        }
        else {
            rules = {
                central: true,
                costPerPoint: 10,
                lostWithoutShow: 10,
                lostWithShow: 3,
                murder: false
            }
        }
        return rules;
    })
    .service('SideMenu', function ($ionicSideMenuDelegate) {
        this.toggleSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .service('Popup', function ($ionicPopup) {
        this.confirm = function (title, template) {
            return $ionicPopup.confirm({
                title: title,
                template: template
            });
        };

        this.alert = function (title, template) {
            return $ionicPopup.alert({
                title: title,
                template: template
            })
        };
    });