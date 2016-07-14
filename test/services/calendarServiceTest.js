describe('Service: CalendarService', function () {
    beforeEach(module('ponyApp'));

    var cycleCallback;
    var dayCallback;
    var seasonCallback;
    var yearCallback;
    var CalendarService;
    var EventService;

    beforeEach(inject(function (_CalendarService_, _EventService_, _$rootScope_) {
        CalendarService = _CalendarService_;
        EventService = _EventService_;
        $rootScope = _$rootScope_;

        cycleCallback = jasmine.createSpy('cycleCallback');
        dayCallback = jasmine.createSpy('dayCallback');
        seasonCallback = jasmine.createSpy('seasonCallback');
        yearCallback = jasmine.createSpy('yearCallback');
    }));

    it('Initialize', function () {
        spyOn(EventService, 'subscribe').and.callThrough();
        CalendarService.init();
        expect(EventService.subscribe).toHaveBeenCalledTimes(1);

        CalendarService.init();
        expect(EventService.subscribe).toHaveBeenCalledTimes(1);
    });

    // Cycle through two complete day cycles
    it('Day/night cycle', function () {
        CalendarService.init(2, 1, 5, 0, 0, 0);
        EventService.subscribe(EventService.CALENDAR_EVENTS.CYCLE, cycleCallback);
        EventService.subscribe(EventService.CALENDAR_EVENTS.DAY, dayCallback);

        $rootScope.$emit('timeService-tick', 1);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), true, 0, 1);
        verifyEvents(1, 0, 0, 0);
        $rootScope.$emit('timeService-tick', 2);
        verifyCalendar(2, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, 1, 1);
        verifyEvents(2, 1, 0, 0);
        $rootScope.$emit('timeService-tick', 3);
        verifyCalendar(2, CalendarService.getSeason(CalendarService.SEASONS.SPRING), true, 1, 1);
        verifyEvents(3, 1, 0, 0);
        $rootScope.$emit('timeService-tick', 4);
        verifyCalendar(3, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, 2, 1);
        verifyEvents(4, 2, 0, 0);
    });

    // Cycle through all four seasons and check the start of the next year
    it('Season/year cycle', function () {
        curTicks = 0;
        CalendarService.init(2, 1, 5, 0, 0, 0);

        curTicks = tickForward(curTicks, 9);
        verifyCalendar(5, CalendarService.getSeason(CalendarService.SEASONS.SPRING), true, 4, 1);
        curTicks = tickForward(curTicks, 1);
        verifyCalendar(6, CalendarService.getSeason(CalendarService.SEASONS.SUMMER), false, 5, 1);
        curTicks = tickForward(curTicks, 9);
        verifyCalendar(10, CalendarService.getSeason(CalendarService.SEASONS.SUMMER), true, 9, 1);
        curTicks = tickForward(curTicks, 1);
        verifyCalendar(11, CalendarService.getSeason(CalendarService.SEASONS.AUTUMN), false, 10, 1);
        curTicks = tickForward(curTicks, 9);
        verifyCalendar(15, CalendarService.getSeason(CalendarService.SEASONS.AUTUMN), true, 14, 1);
        curTicks = tickForward(curTicks, 1);
        verifyCalendar(16, CalendarService.getSeason(CalendarService.SEASONS.WINTER), false, 15, 1);
        curTicks = tickForward(curTicks, 9);
        verifyCalendar(20, CalendarService.getSeason(CalendarService.SEASONS.WINTER), true, 19, 1);
        curTicks = tickForward(curTicks, 1);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, 20, 2);
    });

    // Check multiple years
    it('Years', function () {
        curTicks = 0;
        TICKS_PER_YEAR = 40;
        DAYS_PER_YEAR = 20;
        CalendarService.init(2, 1, 5, 0, 0, 0);

        curTicks = tickForward(curTicks, TICKS_PER_YEAR);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, DAYS_PER_YEAR, 2);
        curTicks = tickForward(curTicks, TICKS_PER_YEAR);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, DAYS_PER_YEAR * 2, 3);
        curTicks = tickForward(curTicks, TICKS_PER_YEAR * 7);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, DAYS_PER_YEAR * 9, 10);
        curTicks = tickForward(curTicks, TICKS_PER_YEAR * 990);
        verifyCalendar(1, CalendarService.getSeason(CalendarService.SEASONS.SPRING), false, DAYS_PER_YEAR * 999, 1000);
    });

    // Fire the time service event N number of times
    function tickForward(curTicks, ticks) {
        for (i = 1; i <= ticks; i++) {
            $rootScope.$emit('timeService-tick', curTicks + i);
        }

        return curTicks + ticks;
    }

    // Verify all calendar state items in one shot
    function verifyCalendar(curDay, curSeason, isNight, elapsedDays, elapsedYears) {
        expect(CalendarService.currentDay()).toEqual(curDay);
        expect(CalendarService.currentSeason()).toEqual(curSeason);
        expect(CalendarService.currentlyNight()).toEqual(isNight);
        expect(CalendarService.currentYear()).toEqual(elapsedYears);
        expect(CalendarService.elapsedDays()).toEqual(elapsedDays);
    }

    // Verify how many times each event fired
    function verifyEvents(cycle, day, season, year) {
        verifyEvent(cycleCallback, cycle);
        verifyEvent(dayCallback, day);
        verifyEvent(seasonCallback, season);
        verifyEvent(yearCallback, year);
    }

    function verifyEvent(event, count) {
        if (count === 0) {
            expect(event).not.toHaveBeenCalled();
        } else {
            expect(event).toHaveBeenCalledTimes(count);
        }
    }
});