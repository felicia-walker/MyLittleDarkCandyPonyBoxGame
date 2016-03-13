'use strict';

// TO DO: max size, debug messages, event levels
angular.module('ponyApp').factory('LoggerService', [ '$rootScope', 'EventService', function($rootScope, EventService) {
	var queue = [];
	var initialized = false;

	function add(text) {
		// console.log('History add: ' + text);
		queue.push(text);
	}

	function list() {
		return queue;
	}

	function clear() {
		queue = [];
	}

	// Observer methods
	function update(event, ticks) {
		add(ticks);
		notifySubscribers();
	}

	function notifySubscribers() {
		$rootScope.$emit('loggerService-event');
	}

	// Build and return the service
	function init() {
		if (!initialized) {
			initialized = true;
			console.log('Logger service - init');
			EventService.subscribe('timeService-tick', update);
		}
	}

	return {
		init : init,
		add : add,
		list : list,
		clear : clear
	};
} ]);