describe('Service: LoggerService', function () {
    beforeEach(module('ponyApp'));

    var ONE = "one";
    var TWO = "two";
    var THREE = "three"
    var EMPTY_QUEUE = [];
    var ONE_ITEM_QUEUE = [ONE];
    var MULT_ITEM_QUEUE = [ONE, THREE, TWO];

    var LoggerService;
    var EventService;

    beforeEach(inject(function (_LoggerService_, _EventService_, _$rootScope_) {
        LoggerService = _LoggerService_;
        EventService = _EventService_;
        $rootScope = _$rootScope_;
    }));

    it('Initialize', function () {
        spyOn(EventService, 'subscribe').and.callThrough();
        LoggerService.init();
        expect(EventService.subscribe).toHaveBeenCalledTimes(1);

        LoggerService.init();
        expect(EventService.subscribe).toHaveBeenCalledTimes(1);
    });

    it('Initial size is zero', function () {
        spyOn(LoggerService, 'list').and.callThrough();
        var result = LoggerService.list();

        expect(LoggerService.list).toHaveBeenCalled();
        expect(result).toEqual(EMPTY_QUEUE);
    });

    describe('Adding an item, ', function () {
        it('one item', function () {
            spyOn(LoggerService, 'add').and.callThrough();
            LoggerService.add(ONE);
            var list = LoggerService.list();

            expect(LoggerService.add).toHaveBeenCalledTimes(1);
            expect(list).toEqual(ONE_ITEM_QUEUE);
        });

        it('multiple items', function () {
            spyOn(LoggerService, 'add').and.callThrough();
            LoggerService.add(ONE);
            LoggerService.add(THREE);
            LoggerService.add(TWO);
            var list = LoggerService.list();

            expect(LoggerService.add).toHaveBeenCalledTimes(3);
            expect(list).toEqual(MULT_ITEM_QUEUE);
        });
    });

    describe('Clearing the queue, ', function () {
        it('empty', function () {
            spyOn(LoggerService, 'clear').and.callThrough();
            LoggerService.add(ONE);
            LoggerService.clear();
            var list = LoggerService.list();

            expect(LoggerService.clear).toHaveBeenCalled();
            expect(list).toEqual(EMPTY_QUEUE);
        });

        it('multiple items', function () {
            spyOn(LoggerService, 'clear').and.callThrough();
            LoggerService.add(ONE);
            LoggerService.add(THREE);
            LoggerService.add(TWO);
            LoggerService.clear();
            var list = LoggerService.list();

            expect(LoggerService.clear).toHaveBeenCalled();
            expect(list).toEqual(EMPTY_QUEUE);
        });
    });

    it('Logging an event', function () {
        var testCallback = jasmine.createSpy('testCallback')
        $rootScope.$on(EventService.LOGGER_EVENTS.ADD, testCallback);
        LoggerService.init();

        $rootScope.$emit(EventService.TIME_EVENTS.TICK, ONE);
        $rootScope.$emit(EventService.TIME_EVENTS.TICK, THREE);
        $rootScope.$emit(EventService.TIME_EVENTS.TICK, TWO);
        var list = LoggerService.list();

        expect(list).toEqual(MULT_ITEM_QUEUE);
        expect(testCallback).toHaveBeenCalledTimes(3);
    });
});