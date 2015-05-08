'use strict';

// TO DO: max size, debug messages, event levels
angular.module('ponyApp').factory('HistoryService', [function() {
  var queue = [];

  function add(text) {
    queue.push(text);
  }

  function list() {
    return queue;
  }

  function clear() {
    queue = [];
  }

  // Build and return the service
  return {
    add : add,
    list : list,
    clear : clear
  };
}]);