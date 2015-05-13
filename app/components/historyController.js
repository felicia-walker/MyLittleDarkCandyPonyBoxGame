'use strict';

angular.module('ponyApp').controller('HistoryController', ['$scope', 'LoggerService', function($scope, LoggerService) {
  var self = this;

  $scope.init = function () {
    LoggerService.init();
    LoggerService.subscribe(self);
  }
 
  self.queue = [];
  self.queueLength = 25;
  self.update = function() {
    var queue = LoggerService.list();
    var queuelen = queue.length;
    
    if (queuelen > self.queueLength) {
      queue = queue.slice(queuelen - self.queueLength);
    }

    self.queue = queue.slice().reverse();
  };
  
  $scope.init();
}]);