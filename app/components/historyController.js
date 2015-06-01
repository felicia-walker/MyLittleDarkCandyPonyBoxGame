'use strict';

angular.module('ponyApp').controller('HistoryController', ['$scope', 'LoggerService', function($scope, LoggerService) {
  var self = this;
  
  $scope.queue = [];
  $scope.queueLength = 25;
  
  this.update = function() {
    var queue = LoggerService.list();
    var queuelen = queue.length;
    
    if (queuelen > self.queueLength) {
      queue = queue.slice(queuelen - self.queueLength);
    }

    $scope.queue = queue.slice().reverse();
  };
  
  // Self initialization
  $scope.init = function () {
    LoggerService.init();
    LoggerService.subscribe(self);
  }
 
  $scope.init();
}]);