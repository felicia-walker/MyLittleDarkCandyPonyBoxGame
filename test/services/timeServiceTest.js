describe('Service: TimeService', function() {
	beforeEach(module('ponyApp'));

	var TimeService;
	var sub = {
			i : 0,
			update : function(ticks) {
				this.i = 100 + ticks;
			}
		}

		var sub2 = {
			j : 0,
			update : function(ticks) {
				this.j = 200 + ticks;
			}
		}

	beforeEach(inject(function(_TimeService_, _$interval_) {
		TimeService = _TimeService_;
		$interval = _$interval_;
	}));

	it('Basic test with pause/unpause and subscriber/unsubscribe', function() {
		spyOn(TimeService, 'pause').and.callThrough();
		spyOn(TimeService, 'unpause').and.callThrough();

		// Sub1 only
		TimeService.subscribe(sub);
		TimeService.start();
		expect(TimeService.isStarted()).toBe(true);
		expect(TimeService.isPaused()).toBe(false);
		expect(TimeService.elapsedTicks()).toEqual(0);

		// 1 sec, sub1 only
		$interval.flush(1000)
		expect(TimeService.elapsedTicks()).toEqual(1);
		expect(sub.i).toEqual(101);
		expect(sub2.j).toEqual(0);

		// 5 sec, paused
		TimeService.pause();
		expect(TimeService.isPaused()).toBe(true);
		expect(TimeService.pause.calls.count()).toEqual(1);
		expect(TimeService.unpause.calls.count()).toEqual(0);
		
		$interval.flush(5000)
		expect(TimeService.elapsedTicks()).toEqual(1);
		expect(sub.i).toEqual(101);
		expect(sub2.j).toEqual(0);

		// 8.888 sec, unpaused, Sub1 and Sub2
		TimeService.subscribe(sub2);
		TimeService.unpause();
		expect(TimeService.isPaused()).toBe(false);
		expect(TimeService.pause.calls.count()).toEqual(1);
		expect(TimeService.unpause.calls.count()).toEqual(1);
		
		$interval.flush(8888)
		expect(TimeService.elapsedTicks()).toEqual(9);
		expect(sub.i).toEqual(109);
		expect(sub2.j).toEqual(209);
		
		// 3 sec, Sub1 unsubscribed
		TimeService.unsubscribe(sub);
		$interval.flush(3000)
		expect(TimeService.elapsedTicks()).toEqual(12);
		expect(sub.i).toEqual(109);
		expect(sub2.j).toEqual(212);
	});
});