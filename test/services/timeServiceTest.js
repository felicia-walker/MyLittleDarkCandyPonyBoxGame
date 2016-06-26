describe('Service: TimeService', function () {
    beforeEach(module('ponyApp'));

    var TimeService;
    var EventService;
    var s1 = {
        i: 0,
        update: function (event, ticks) {
            this.i = 100 + ticks;
        },
        init: function () {
            this.i = 100;
        }
    }

    var s2 = {
        j: 0,
        update: function (event, ticks) {
            this.j = 200 + ticks;
        },
        init: function () {
            this.j = 200;
        }
    }


    beforeEach(inject(function (_TimeService_, _EventService_, _$interval_, _$rootScope_) {
        TimeService = _TimeService_;
        EventService = _EventService_;
        $interval = _$interval_;
        $rootScope = _$rootScope_;
    }));

    it('Basic test with pause/unpause and subscriber/unsubscribe', function () {
        spyOn(TimeService, 'pause').and.callThrough();
        spyOn(TimeService, 'unpause').and.callThrough();

        // Sub1 only
        var sub1 = $rootScope.$on('timeService-tick', s1.update.bind(s1));
        TimeService.start();
        expect(TimeService.isStarted()).toBe(true);
        expect(TimeService.isPaused()).toBe(false);
        expect(TimeService.elapsedTicks()).toEqual(0);

        // 1 sec, sub1 only
        $interval.flush(1000)
        expect(TimeService.elapsedTicks()).toEqual(1);
        expect(s1.i).toEqual(101);
        expect(s2.j).toEqual(0);

        // 5 sec, paused
        TimeService.pause();
        expect(TimeService.isPaused()).toBe(true);
        expect(TimeService.pause.calls.count()).toEqual(1);
        expect(TimeService.unpause.calls.count()).toEqual(0);

        $interval.flush(5000)
        expect(TimeService.elapsedTicks()).toEqual(1);
        expect(s1.i).toEqual(101);
        expect(s2.j).toEqual(0);

        // 8.888 sec, unpaused, Sub1 and Sub2
        var sub2 = $rootScope.$on('timeService-tick', s2.update.bind(s2));
        TimeService.unpause();
        expect(TimeService.isPaused()).toBe(false);
        expect(TimeService.pause.calls.count()).toEqual(1);
        expect(TimeService.unpause.calls.count()).toEqual(1);

        $interval.flush(8888)
        expect(TimeService.elapsedTicks()).toEqual(9);
        expect(s1.i).toEqual(109);
        expect(s2.j).toEqual(209);

        // 3 sec, Sub1 unsubscribed
        sub1();
        $interval.flush(3000)
        expect(TimeService.elapsedTicks()).toEqual(12);
        expect(s1.i).toEqual(109);
        expect(s2.j).toEqual(212);
    });
});