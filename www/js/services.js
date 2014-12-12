angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Players', function () {

        var players = [
            {
                name:"p1"
            },
            {
                name:"p2"
            },
            {
                name:"p3"
            },
            {
                name:"p4"
            },
            {
                name:"p5"
            }
        ];

        return {
            all: function () {
                return players;
            }
        }
    });
