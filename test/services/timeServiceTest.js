describe('Service: TimeService', function() {
	beforeEach(module('ponyApp'));

	var TimeService;
	var sub = {
			i : 1,
			update : function(ticks) {
				console.log("x" + this.i);
				this.i = this.i + ticks;
			}
		}

		var sub2 = {
			j : 1,
			update : function(ticks) {
				console.log("y" + this.j);
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
		spyOn(TimeService, 'notifySubscribers').and.callThrough();
		
		TimeService.start();
		expect(TimeService.isStarted()).toBe(true);
		expect(TimeService.elapsedTicks()).toEqual(0);
		expect(TimeService.notifySubscribers.calls.count()).toEqual(0);

		$interval.flush(1000)
		expect(TimeService.elapsedTicks()).toEqual(1);
		expect(TimeService.notifySubscribers.calls.count()).toEqual(1);

		$interval.flush(8888)
		expect(TimeService.elapsedTicks()).toEqual(9);
		expect(TimeService.notifySubscribers.calls.count()).toEqual(9);
	});

	it('Subscribe/unsubscribe', function() {
		TimeService.ticks = 5;
		TimeService.subscribe(sub);
		TimeService.notifySubscribers();
		expect(sub.i).toEqual(6);
		expect(sub2.j).toEqual(1);

		TimeService.subscribe(sub2);
		TimeService.notifySubscribers();
		expect(sub.i).toEqual(11);
		expect(sub2.j).toEqual(6);

		TimeService.unsubscribe(sub);
		TimeService.notifySubscribers();
		expect(sub.i).toEqual(11);
		expect(sub2.j).toEqual(11);
	});
});