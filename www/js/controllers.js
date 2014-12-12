angular.module('starter.controllers', [])

    .controller('MarriageCtrl', function ($scope, $timeout, $state,$ionicModal) {

        $scope.tasks = [
            { title: 'Collect coins' },
            { title: 'Eat mushrooms' },
            { title: 'Get high enough to grab the flag' },
            { title: 'Find the Princess' }
        ];


        // Create and load the Modal
        $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Called when the form is submitted
        $scope.createTask = function(task) {
            $scope.tasks.push({
                title: task.title
            });
            $scope.taskModal.hide();
            task.title = "";
        };

        // Open our new task modal
        $scope.newTask = function() {
            $scope.taskModal.show();
        };

        // Close the new task modal
        $scope.closeNewTask = function() {
            $scope.taskModal.hide();
        };

        $scope.newGame = function () {
            $state.go('players', {});
        };
    })

    .controller('PlayersCtrl', function ($scope,Players,$state) {
        $scope.players =Players.all();
        var removePlayer = function (player) {
            if ($scope.players.length == 1) {
                $scope.players[0].name = "";
            }
            else {
                $scope.players.splice($scope.players.indexOf(player), 1);
            }
        };

        $scope.removePlayer = function (player) {
            removePlayer(player);
        };
        $scope.addPlayer = function () {
            //TODO: verify all existing players are not empty

            $scope.players.push(
                {
                    name: ''
                });
        };

        $scope.startGame = function(){
            //TODO: verify data
            $state.go('players.gameOn')
        }
    })
    .controller('GameOnCtrl',function($scope,Players){
         $scope.players = Players.all();
    });
;

