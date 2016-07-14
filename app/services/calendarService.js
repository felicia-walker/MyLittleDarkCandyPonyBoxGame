angular.module('ponyApp').factory('CalendarService', ['$rootScope', 'EventService', function ($rootScope, EventService) {
    var SEASON_NAMES = ['Spring', 'Summer', 'Autumn', 'Winter'];
    var SEASONS_TYPE = {
        SPRING: 0,
        SUMMER: 1,
        AUTUMN: 2,
        WINTER: 3
    };

    // Base is 1 day/min, 15 days/season, 4 seasons/60 days/year with 30 sec per night and day cycle
    var TICKS_PER_DAY = 60;
    var TICKS_PER_SUN = 30;
    var DAYS_PER_SEASON = 15;
    var DAY_MULT = 0;
    var CYCLE_MULT = 0;
    var SEASON_MULT = 0;

    var curCycleTicks = 0;
    var curDay = 1;
    var totalDays = 0;
    var isNight = false;
    var curSeasonIndex = 0;
    var curYear = 1;
    var initialized = false;

    var dayMult;
    var cycleMult;
    var seasonMult;

    var ticksPerDay;
    var ticksPerSun;
    var daysPerSeason;

    function getRandomInt(base, mult) {
        var offset = base * mult;
        var min = base - offset;
        var max = base + offset;
        var num = Math.floor(Math.random() * (max - min + 1) + min);
        // console.log(min + " " + max + " " + num);
        return num;
    }

    function getSeason(seasonType) {
        return SEASON_NAMES[seasonType];
    }

    function elapsedDays() {
        return totalDays;
    }

    function currentYear() {
        return curYear;
    }

    function currentDay() {
        return curDay;
    }

    function currentlyNight() {
        return isNight;
    }

    function currentSeason() {
        return SEASON_NAMES[curSeasonIndex];
    }

    function notifySubscribers(event, value) {
        //console.log(getEvent(type));
        $rootScope.$emit(event, value);
    }

    // Update and notification
    function update(event, ticks) {
        // NOTE: ticks will be the number of elapsed ticks, not how many new ones
        //console.log("Cal update - " + ticks + " " + curDay);

        curCycleTicks += 1;
        if (!isNight && (curCycleTicks === ticksPerSun)) {
            //console.log("Cal update - night");
            isNight = true;
            ticksPerSun = getRandomInt(TICKS_PER_SUN, cycleMult)

            notifySubscribers(EventService.CALENDAR_EVENTS.CYCLE, isNight);
        } else if (ticks % ticksPerDay === 0) {
            //console.log("Cal update - new day");
            curDay += 1;
            totalDays += 1;
            curCycleTicks = 0;
            isNight = false;
            ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult)

            notifySubscribers(EventService.CALENDAR_EVENTS.DAY, curDay);
            notifySubscribers(EventService.CALENDAR_EVENTS.CYCLE, isNight);

            if ((curDay - 1) % daysPerSeason === 0) {
                //console.log("Cal update - season");
                curSeasonIndex += 1;
                daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);

                if (curSeasonIndex >= SEASON_NAMES.length) {
                   // console.log("Cal update - year");
                    curSeasonIndex = 0;
                    curDay = 1;
                    curYear += 1;

                    notifySubscribers(EventService.CALENDAR_EVENTS.YEAR, curYear);
                }

                notifySubscribers(EventService.CALENDAR_EVENTS.SEASON, currentSeason());
            }
        }
    }

    // Build and return the service
    function init(tpd, tps, dps, dm, cm, sm) {
        if (!initialized) {
            initialized = true;
            EventService.subscribe(EventService.TIME_EVENTS.TICK, update);

            // Normally used for tests
            if (exists(tpd)) {
                TICKS_PER_DAY = tpd;
            }

            if (exists(tps)) {
                TICKS_PER_SUN = tps;
            }

            if (exists(dps)) {
                DAYS_PER_SEASON = dps;
            }

            if (exists(dm)) {
                DAY_MULT = dm;
            }

            if (exists(cm)) {
                CYCLE_MULT = cm;
            }

            if (exists(sm)) {
                SEASON_MULT = sm;
            }

            // Init there here so we can use test values
            dayMult = DAY_MULT;
            cycleMult = CYCLE_MULT;
            seasonMult = SEASON_MULT;

            ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult);
            ticksPerSun = getRandomInt(TICKS_PER_SUN, cycleMult);
            daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);
        }
    }

    function exists(value) {
        return (typeof value !== 'undefined' && value !== null);
    }

    return {
        currentDay: currentDay,
        currentSeason: currentSeason,
        currentlyNight: currentlyNight,
        currentYear: currentYear,
        elapsedDays: elapsedDays,
        init: init,
        getSeason: getSeason,
        SEASONS: SEASONS_TYPE
    }
}]);