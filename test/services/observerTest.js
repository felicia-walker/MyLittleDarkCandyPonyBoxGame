describe('Service: TimeService', function() {
	beforeEach(module('ponyApp'));

	var TimeService;
	var sub = {
			i : 0,
			update : function(ticks) {
				this.i = this.i + ticks;
			}
		}

		var sub2 = {
			j : 0,
			update : function(ticks) {
				this.j += ticks;
			}
		}

	beforeEach(inject(function(_TimeService_, _$interval_) {
		TimeService = _TimeService_;
		$interval = _$interval_;
	}));

	it('Pause and unpause', function() {
		spyOn(TimeService, 'pause').and.callThrough();
		spyOn(TimeService, 'unpause').and.callThrough();

		TimeService.pause();
		expect(TimeService.isPaused()).toBe(true);
		expect(TimeService.pause.calls.count()).toEqual(1);
		expect(TimeService.unpause.calls.count()).toEqual(0);

		TimeService.unpause();
		expect(TimeService.isPaused()).toBe(false);
		expect(TimeService.pause.calls.count()).toEqual(1);
		expect(TimeService.unpause.calls.count()).toEqual(1);

		TimeService.pause();
		expect(TimeService.isPaused()).toBe(true);
		expect(TimeService.pause.calls.count()).toEqual(2);
		expect(TimeService.unpause.calls.count()).toEqual(1);
	});

	it('Start ', function() {
		spyOn(TimeService, '_notifySubscribers').and.callThrough();
		
		TimeService.start();
		expect(TimeService.isStarted()).toBe(true);
		expect(TimeService.elapsedTicks()).toEqual(0);
		expect(TimeService._notifySubscribers.calls.count()).toEqual(0);

		$interval.flush(1000)
		expect(TimeService.elapsedTicks()).toEqual(1);
		expect(TimeService._notifySubscribers.calls.count()).toEqual(1);

		$interval.flush(8888)
		expect(TimeService.elapsedTicks()).toEqual(9);
		expect(TimeService._notifySubscribers.calls.count()).toEqual(9);
	});

	it('Subscribe/unsubscribe', function() {
		TimeService._setticks(5);
		
		TimeService.subscribe(sub);
		TimeService._notifySubscribers();
		expect(sub.i).toEqual(5);
		expect(sub2.j).toEqual(0);

		TimeService.subscribe(sub2);
		TimeService._notifySubscribers();
		expect(sub.i).toEqual(10);
		expect(sub2.j).toEqual(5);

		TimeService.unsubscribe(sub);
		TimeService._notifySubscribers();
		expect(sub.i).toEqual(10);
		expect(sub2.j).toEqual(10);
	});
});