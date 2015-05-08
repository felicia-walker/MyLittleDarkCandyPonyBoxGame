'use strict';

// TODO Allow current amt initialization
angular.module('ponyApp').factory('TimeService', ['$interval', 'HistoryService', function($interval, HistoryService) {
  var SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
  
  // Base is 1 day/min, 15 days/season, 4 seasons/60 days/year with 30 sec per night and day cycle
  var SEC_PER_TICK = 1;
  var TICKS_PER_DAY = 60;
  var TICKS_PER_SUN = 30;
  var TICKS_PER_MOON = TICKS_PER_DAY - TICKS_PER_SUN;
  var DAYS_PER_SEASON = 15;
  var SEASONS_PER_YEAR = SEASONS.length;
  
  var subscribers = [];
  var paused = true;
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
  
  function start() {
    timer = $interval(function() {
      if (!paused) {
        elapsedTicks += 1;
      }
    }, 1000 * SEC_PER_TICK);
  }
  
  // Build and return the service
  return {
    start : start,
    pause : pause,
    unpause : unpause,
    isPaused : isPaused
  }
}]);