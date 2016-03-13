'use strict';

angular.module('ponyApp').controller('HistoryController', 
		['$scope', 'LoggerService', 'EventService', 
		 function($scope, LoggerService, EventService) {
			
  var self = this;
  
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
  
  // Self initialization
  self.init = function () {
    LoggerService.init();
    EventService.subscribe('loggerService-event', self.update);
  }
 
  self.init();
}]);