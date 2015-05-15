'use strict';

// TO DO: max size, debug messages, event levels
angular.module('ponyApp').factory('LoggerService', ['TimeService', function(TimeService) {
  var queue = [];
  var subscribers = [];

  function add(text) {
    console.log('History add: ' + text);
    queue.push(text);
  }

  function list() {
    return queue;
  }

  function clear() {
    queue = [];
  }

  // Observer methods
  function update(ticks) {
    add(ticks);
    notifySubscribers();
  }
  
  function subscribe(subscriber) {
    console.log("LoggerService - added subscriber");
    subscribers.push(subscriber);
  }

  function unsubscribe(subscriber) {
    var len = subscribers.length;
    for (var i = 0; i < len; i++) {
      if (subscribers[i] === subscriber) {
        subscribers(i, 1);
        return true;
      }
    }

    return false;
  }

  function notifySubscribers() {
    var len = subscribers.length;
    for (var i = 0; i < len; i++) {
      subscribers[i].update();
    }
  }

  // Build and return the service
  function init(){
    TimeService.subscribe(this);
  }
  
  return {
    init: init,
    add: add,
    list: list,
    clear: clear,
    update: update,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    notifySubscribers: notifySubscribers
  };
}]);