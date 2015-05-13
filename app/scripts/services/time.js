'use strict';

// TODO Allow current amt initialization
angular.module('ponyApp').factory('TimeService', ['$interval', function($interval) {
  var SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

  // Base is 1 day/min, 15 days/season, 4 seasons/60 days/year with 30 sec per
  // night and day cycle
  var SEC_PER_TICK = 1;
  var TICKS_PER_DAY = 60;
  var TICKS_PER_SUN = 30;
  var TICKS_PER_MOON = TICKS_PER_DAY - TICKS_PER_SUN;
  var DAYS_PER_SEASON = 15;
  var SEASONS_PER_YEAR = SEASONS.length;

  var subscribers = [];
  var paused = true;
  var started = false;
  var timer;

  var elapsedTicks = 0;
  var elapsedDays = 0;
  var elapsedSeasons = 0;
  var elapsedYears = 0;
  var currentlyNight = false;

  function pause() {
    paused = true;
  }

  function unpause() {
    paused = false;
  }

  function isPaused() {
    return paused;
  }

  function isStarted() {
    return started;
  }

  function subscribe(subscriber) {
    console.log("TimeService - added subscriber");
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
      subscribers[i].update(elapsedTicks);
    }
  }

  function start() {
    if (!started) {
      started = true;
      timer = $interval(function() {
        if (!paused) {
          elapsedTicks += 1;
          console.log('Ticks: ' + elapsedTicks);
          notifySubscribers();
        }
      }, 1000 * SEC_PER_TICK);
    }
  }

  // Build and return the service
  return {
    start: start,
    pause: pause,
    unpause: unpause,
    isPaused: isPaused,
    isStarted: isStarted,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    notifySubscribers: notifySubscribers
  }
}]);