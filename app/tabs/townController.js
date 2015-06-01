'use strict';

angular.module('ponyApp').controller('TownController', ['$scope', 'TimeService', function($scope, TimeService) {
  $scope.buttonText = "Start";
  
  $scope.start = function() {
    if (TimeService.isPaused()) {
      self.buttonText = "Pause";
      TimeService.unpause();
      TimeService.start();
    }
    else {
      self.buttonText = "Unpause";
      TimeService.pause();
    }
  }
  
}]);
