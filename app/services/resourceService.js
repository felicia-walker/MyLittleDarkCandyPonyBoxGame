angular.module('ponyApp').factory('ResourceService', ['$rootScope', 'EventService', 'CalendarService', function ($rootScope, EventService, CalendarService) {
    var initialized = false;

    var testobj = {
        name: 'Test',
        description: 'Test description',
        amount: 0,
        max_amount: 10,
        base_rate: 1,
        current_rate: 1
        // TODO crafting requirements
        // TOCO update other resource function
    }

    function update(event, ticks) {
        console.log("xxx = " + value);
    }

    function notifySubscribers() {
        //$rootScope.$emit('ResourceService-tick', ticks);
    }

    // Build and return the service
    function init() {
        if (!initialized) {
            initialized = true;
            //console.log('Resource service - init');
            EventService.subscribe(TimeService.getEvent(TimeService.EVENTS.TICK), update);
        }
    }

    return {}
}]);