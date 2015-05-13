'use strict';

angular.module('ponyApp').controller('HistoryController', ['$scope', 'HistoryService', function($scope, HistoryService) {
  var self = this;
  var HISTORY_SIZE = 25;

  $scope.init = function () {
    HistoryService.init();
    HistoryService.subscribe(self);
  }
 
  self.queue = [];
  self.update = function() {
    var queue = HistoryService.list();
    var queuelen = queue.length;
    
    if (queuelen > HISTORY_SIZE) {
      queue = queue.slice(queuelen - HISTORY_SIZE);
    }

    self.queue = queue.slice().reverse();
  };
  
  $scope.init();
}]);