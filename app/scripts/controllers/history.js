'use strict';

angular.module('ponyApp').controller('HistoryController', ['HistoryService', function(HistoryService) {
  var self = this;
  var queue = [];
  var HISTORY_SIZE = 15;

  self.get = function() {
    queue = queue.concat(HistoryService.list());

    var queuelen = queue.length;
    if (queuelen > HISTORY_SIZE) {
      queue = queue.slice(queuelen - HISTORY_SIZE);
    }

    return queue.slice().reverse();
  };
}]);