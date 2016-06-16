describe('Service: EventService', function() {
	beforeEach(module('ponyApp'));

	var EVENT_A = 'event-A';
	var EVENT_B = 'event-B';
	var EVENT_C = 'event-C';

	var EventService;
	var s1 = {
			i : 0,
			update : function(event, val) {
				this.i += val;
			},
			init : function () {
				this.i = 100;
			}
	}

	var s2 = {
			j : 0,
			update : function(event, val) {
				this.j += val;
			}
		,
		init : function () {
			this.j = 200;
		}
	}

	var s3 = {
		text: '',
		update : function(event, val) {
			this.text += val;
		},
		init : function () {
			this.text = 'Sample'
		}
	}

	beforeEach(inject(function(_EventService_, _$rootScope_) {
		EventService = _EventService_;
		$rootScope = _$rootScope_;

		s1.init();
		s2.init();
		s3.init();
	}));

	it('Single event, subscribe/unsubscribe', function() {
		spyOn(EventService, 'subscribe').and.callThrough();
		spyOn(EventService, 'unsubscribe').and.callThrough();

		var s1_id = EventService.subscribe(EVENT_A, s1.update.bind(s1));
		expect(s1_id).toEqual(2);

		$rootScope.$emit(EVENT_A, 5);
		expect(EventService.subscribe).toHaveBeenCalled();
		expect(s1.i).toEqual(105);

		EventService.unsubscribe(s1_id);
		$rootScope.$emit(EVENT_A, 500);

		expect(EventService.unsubscribe).toHaveBeenCalled();
		expect(s1.i).toEqual(105);
	});

	it('Multiple subscribers, single event multiple times', function() {
		var s1_id = EventService.subscribe(EVENT_A, s1.update.bind(s1));
		var s2_id = EventService.subscribe(EVENT_A, s2.update.bind(s2));
		var s3_id = EventService.subscribe(EVENT_A, s3.update.bind(s3));
		expect(s1_id).toEqual(2);
		expect(s2_id).toEqual(3);
		expect(s3_id).toEqual(4);

		$rootScope.$emit(EVENT_A, 3);
		expect(s1.i).toEqual(103);
		expect(s2.j).toEqual(203);
		expect(s3.text).toEqual('Sample3');
	});

	it('Single subscriber, multiple events', function() {
		var s1_id = EventService.subscribe(EVENT_A, s1.update.bind(s1));
		var s2_id = EventService.subscribe(EVENT_B, s1.update.bind(s1));
		var s3_id = EventService.subscribe(EVENT_C, s1.update.bind(s1));
		expect(s1_id).toEqual(2);
		expect(s2_id).toEqual(3);
		expect(s3_id).toEqual(4);

		$rootScope.$emit(EVENT_A, 3);
		expect(s1.i).toEqual(103);

		$rootScope.$emit(EVENT_B, 30);
		expect(s1.i).toEqual(133);

		$rootScope.$emit(EVENT_A, 5001);
		expect(s1.i).toEqual(5134);
	});

	it('Multiple subscribers, multiple events', function() {
		var s1a_id = EventService.subscribe(EVENT_A, s1.update.bind(s1));
		var s1b_id = EventService.subscribe(EVENT_B, s1.update.bind(s1));
		var s2b_id = EventService.subscribe(EVENT_B, s2.update.bind(s2));
		var s2c_id = EventService.subscribe(EVENT_C, s2.update.bind(s2));
		var s3c_id = EventService.subscribe(EVENT_C, s3.update.bind(s3));
		var s3a_id = EventService.subscribe(EVENT_A, s3.update.bind(s3));
		expect(s1a_id).toEqual(2);
		expect(s1b_id).toEqual(3);
		expect(s2b_id).toEqual(4);
		expect(s2c_id).toEqual(5);
		expect(s3c_id).toEqual(6);
		expect(s3a_id).toEqual(7);

		$rootScope.$emit(EVENT_C, 3);
		expect(s1.i).toEqual(100);
		expect(s2.j).toEqual(203);
		expect(s3.text).toEqual('Sample3');

		$rootScope.$emit(EVENT_A, 30);
		expect(s1.i).toEqual(130);
		expect(s2.j).toEqual(203);
		expect(s3.text).toEqual('Sample330');

		$rootScope.$emit(EVENT_B, 5001);
		expect(s1.i).toEqual(5131);
		expect(s2.j).toEqual(5204);
		expect(s3.text).toEqual('Sample330');
	});
});