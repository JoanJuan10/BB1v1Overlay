(function() {
  'use strict';
  angular.module('bbOverlayApp', [])
    .controller('MainController', ['$scope', function($scope) {
      $scope.data = { title: '', value: '' };
      $scope.blueName = [false, "PLAYERNAME"];
      $scope.redName = [false, "PLAYERNAME"];
      var socket = new WebSocket('ws://localhost:58869/ws/in');
      var messageCount = 0;
      var incoming;
      socket.onopen = function() {
        console.log('WebSocket conectado');
      };
      socket.onmessage = function(event) {
        messageCount++;
        if (messageCount <= 2) {
          return;
        }
        try {
          incoming = JSON.parse(event.data);
        } catch (e) {
          console.warn('Ignored non-JSON message:', event.data);
          return;
        }
        console.log('Received JSON:', incoming);
        if (incoming.type !== 'ingame-state-update') {
          return;
        }
        $scope.$apply(function() {
          $scope.data = incoming.state;
        });

        // Timer
        var gameTime = Math.floor($scope.data.gameTime);
        console.log('gameTime:', gameTime);
        $scope.minutos = gameTime / 60 < 10 ? '0' + Math.floor(gameTime / 60) : Math.floor(gameTime / 60);
        $scope.segundos = gameTime % 60 < 10 ? '0' + Math.floor(gameTime % 60) : Math.floor(gameTime % 60);

        // Procesar minions que quedan
        if ($scope.data.scoreboardBottom.teams[0].players[0]) {
            if ($scope.data.scoreboardBottom.teams[0].players[0].creepScore >= 100) {
                $scope.minionsBlue = true;
            }
        }
        if ($scope.data.scoreboardBottom.teams[1].players[0]) {
            if ($scope.data.scoreboardBottom.teams[1].players[0].creepScore >= 100) {
                $scope.minionsRed = true;
            }
        }

        // Procesar vidas Azul
        if ($scope.data.scoreboardBottom.teams[0].players[0]) {
            switch ($scope.data.scoreboardBottom.teams[0].players[0].deaths) {
                case 0:
                    $scope.bluelife1remain = true;
                    $scope.bluelife2remain = true;
                    break;
                case 1:
                    $scope.bluelife1remain = false;
                    $scope.bluelife2remain = true;
                    break;
                case 2:
                    $scope.bluelife1remain = false;
                    $scope.bluelife2remain = false;
                    break;
                default:
                    $scope.bluelife1remain = false;
                    $scope.bluelife2remain = false;
                    break;
            }
        }
        // Procesar vidas Rojo
        if ($scope.data.scoreboardBottom.teams[1].players[0]) {
            switch ($scope.data.scoreboardBottom.teams[1].players[0].deaths) {
                case 0:
                    $scope.redlife1remain = true;
                    $scope.redlife2remain = true;
                    break;
                case 1:
                    $scope.redlife1remain = false;
                    $scope.redlife2remain = true;
                    break;
                case 2:
                    $scope.redlife1remain = false;
                    $scope.redlife2remain = false;
                    break;
                default:
                    $scope.redlife1remain = false;
                    $scope.redlife2remain = false;
                    break;
            }
        }
        // Procesar Torres
        if ($scope.data.scoreboard.teams[0].towers == 1) {
            $scope.redexploded = true;
        }
        else {
            $scope.redexploded = false;
        }
        if ($scope.data.scoreboard.teams[1].towers == 1) {
            $scope.blueexploded = true;
        }
        else {
            $scope.blueexploded = false;
        }
        
      };
      socket.onerror = function(error) {
        console.error('WebSocket error:', error);
      };
      socket.onclose = function() {
        console.log('WebSocket desconectado');
      };

    }]);
})();