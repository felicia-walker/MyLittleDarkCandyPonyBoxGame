// Time service provides a simple notification everytime a tick occurs, which
// can be djusted to a certian number per second. It also supports pausing.

angular.module('ponyApp').factory('TimeService', [ '$interval', '$rootScope', 'EventService' , function($interval, $rootScope, EventService) {
	var SEC_PER_TICK = 1;

	var paused = false;
	var started = false;
	var timer;

	var ticks = 0;

	// Data access
	function isPaused() {
		return paused;
	}

	function isStarted() {
		return started;
	}

	function elapsedTicks() {
		return ticks;
	}

	// Functionality
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

	function pause() {
		paused = true;
	}

	function unpause() {
		paused = false;
	}

	function notifySubscribers() {
		$rootScope.$emit('timeService-tick', ticks);
	}

	// Build and return the service
	return {
		start : start,
		pause : pause,
		unpause : unpause,
		isPaused : isPaused,
		isStarted : isStarted,
		elapsedTicks : elapsedTicks
	}
} ]);