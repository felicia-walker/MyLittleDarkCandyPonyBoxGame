'use strict';

angular.module('ponyApp').factory('HistoryService', [ function() {
  var queue = [];

  return {
    add : function(text) {
      queue.push(text);
    },
    list : function() {
      return queue;
    },
    clear : function() {
      queue = [];
    }
  };
} ]);