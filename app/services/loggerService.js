// TO DO: max size, debug messages, event levels
angular.module('ponyApp').factory('LoggerService', [ '$rootScope', 'EventService', function($rootScope, EventService) {
	var queue = [];
	var initialized = false;

	function add(text) {
		//console.log('History add: ' + text);
		queue.push(text);
	}

	function list() {
		return queue;
	}

	function clear() {
		queue = [];
	}

	// Observer methods
	function update(event, value) {
		add(value);

		notifySubscribers();
	}

	function notifySubscribers() {
		$rootScope.$emit(EventService.LOGGER_EVENTS.ADD);
	}

	// Build and return the service
	function init() {
		if (!initialized) {
			initialized = true;
			//console.log('Logger service - init');
			EventService.subscribe(EventService.TIME_EVENTS.TICK, update);
		}
	}

	return {
		init : init,
		add : add,
		list : list,
		clear : clear
	};
} ]);