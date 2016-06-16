angular.module('ponyApp').factory('EventService', [ '$rootScope', function($rootScope) {
	var subscribers = [];
	var master_id = 1;

	function Subscriber(id, handler) {
		this.id = id
		this.handler = handler;
	}

	function init() {
		subscribers = [];
		master_id = 1;
	}

	function subscribe(event, callback) {
		var handler = $rootScope.$on(event, callback);
		master_id = master_id + 1;
		subscribers.push(new Subscriber(master_id, handler));

		return master_id;
	}

	function unsubscribe(id) {
		var len = subscribers.length;
		for (var i = 0; i < len; i++) {
			if (subscribers[i].id === id) {
				subscribers[i].handler();
				subscribers.splice(i, 1);
				return true;
			}
		}

		return false;
	}
	
	return {
		subscribe : subscribe,
		unsubscribe : unsubscribe,
		init: init
	}
} ]);