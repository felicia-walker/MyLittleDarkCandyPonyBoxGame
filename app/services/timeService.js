'use strict';

// Time service provides a simple notification everytime a tick occurs, which
// can be djusted to a certian number per second. It also supports pausing.

// TODO Allow current amt initialization
angular.module('ponyApp').factory('TimeService', [ '$interval', function($interval) {
	var SEC_PER_TICK = 1;

	var subscribers = [];
	var paused = false;
	var started = false;
	var timer;

	var ticks = 0;

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

	function elapsedTicks() {
		return ticks;
	}

	function subscribe(subscriber) {
		console.log("TimeService - added subscriber");
		subscribers.push(subscriber);
	}

	function unsubscribe(subscriber) {
		var len = subscribers.length;
		for (var i = 0; i < len; i++) {
			if (subscribers[i] === subscriber) {
				subscribers = subscribers.slice(i, i+1);
				return true;
			}
		}

		return false;
	}

	function notifySubscribers() {
		var len = subscribers.length;
		for (var i = 0; i < len; i++) {
			subscribers[i].update(ticks);
		}
	}

	function start() {
		if (!started) {
			started = true;
			timer = $interval(function() {
				if (!paused) {
					ticks += 1;
					console.log('Ticks: ' + ticks);
					notifySubscribers();
				}
			}, 1000 * SEC_PER_TICK);
		}
	}
	
	// Build and return the service
	return {
		start : start,
		pause : pause,
		unpause : unpause,
		isPaused : isPaused,
		isStarted : isStarted,
		elapsedTicks : elapsedTicks,
		subscribe : subscribe,
		unsubscribe : unsubscribe,
		notifySubscribers: notifySubscribers
	}
} ]);