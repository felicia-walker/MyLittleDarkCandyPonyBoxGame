'use strict';

angular.module('ponyApp').controller('TownController', ['$scope', 'TimeService', function($scope, TimeService) {
  var self = this;
  self.buttonText = "Start";
  
  self.start = function() {
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
