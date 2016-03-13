'use strict';

angular.module('ponyApp').factory('EventService', [ '$rootScope', function($rootScope) {
	var subscribers = [];

	function Subscriber(event, callback, handler)
	{
		this.event = event;
		this.callback = callback;
		this.handler = handler;
	}
	
	function subscribe(event, callback) {
		var handler = $rootScope.$on(event, callback);
		subscribers.push(new Subscriber(event, callback, handler));
	}

	function unsubscribe(event, callback) {
		var len = subscribers.length;
		for (var i = 0; i < len; i++) {
			if (subscribers[i].event === event && subscribers[i].callback === callback) {
				subscribers[i].handler;
				subscribers.splice(i, 1);
				return true;
			}
		}

		return false;
	}
	
	return {
		subscribe : subscribe,
		unsubscribe : unsubscribe
	}
} ]);