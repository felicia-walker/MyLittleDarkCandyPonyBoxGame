'use strict';

angular.module('ponyApp').factory('CalendarService', [ '$rootScope', 'EventService', function($rootScope, EventService) {
	var SEASONS = [ 'Spring', 'Summer', 'Autumn', 'Winter' ];
	var EVENT_TYPE = {
		DAY : 0,
		CYCLE : 1,
		SEASON : 2,
		YEAR : 3
	};

	// Base is 1 day/min, 15 days/season, 4 seasons/60 days/year with 30 sec per
	// night and day cycle
	var TICKS_PER_DAY = 2;
	var TICKS_PER_SUN = 1;
	var DAYS_PER_SEASON = 5;
	var DAY_MULT = 0;
	var CYCLE_MULT = 0;
	var SEASON_MULT = 0;

	var curCycleTicks = 0;
	var dayCount = 0;
	var isNight = false;
	var curSeasonIndex = 0;
	var yearCount = 0;
	var initialized = false;

	var dayMult = DAY_MULT;
	var cycleMult = CYCLE_MULT;
	var seasonMult = SEASON_MULT;

	var ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult);
	var ticksPerSun = getRandomInt(TICKS_PER_SUN, cycleMult);
	var daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);

	function getRandomInt(base, mult) {
		var offset = base * mult;
		var min = base - offset;
		var max = base + offset;
		var num = Math.floor(Math.random() * (max - min + 1) + min);
		// console.log(min + " " + max + " " + num);
		return num;
	}

	function elapsedDays() {
		return dayCount;
	}

	function elapsedYears() {
		return yearCount;
	}

	function currentDay() {
		return yearCount % dayCount;
	}

	function currentlyNight() {
		return isNight;
	}

	function currentSeason() {
		return SEASONS[curSeasonIndex];
	}

	// Observer methods
	function subscribe(subscriber, type) {
		if (type >= EVENT_TYPE.DAY && type <= EVENT_TYPE.YEAR) {
			// console.log("Calendar Service - added subscriber " + type);
			EventService.subscribe('calendarService-' + type, update);
		} else {
			console.log("Calendar Service ERROR - " + type + " is not a valid event type.");
		}
	}

	function notifySubscribers(type, value) {
		$rootScope.$emit('calendarService-' + type, value);
	}

	// Update and notification
	function update(event, ticks) {
		console.log("Cal update - " + ticks + " " + dayCount);

		curCycleTicks += 1;
		if (!isNight && (curCycleTicks === ticksPerSun)) {
			console.log("Cal update - night");
			isNight = true;
			ticksPerSun = getRandomInt(TICKS_PER_SUN, cycleMult)

			notifySubscribers(EVENT_TYPE.CYCLE, isNight);
		} else if (ticks % ticksPerDay === 0) {
			console.log("Cal update - new day");
			dayCount += 1;
			curCycleTicks = 0;
			isNight = false;
			ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult)

			notifySubscribers(EVENT_TYPE.DAY, dayCount);
			notifySubscribers(EVENT_TYPE.CYCLE, isNight);

			if (dayCount % daysPerSeason === 0) {
				console.log("Cal update - season");
				curSeasonIndex += 1;
				daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);

				if (curSeasonIndex >= SEASONS.length) {
					console.log("Cal update - year");
					curSeasonIndex = 0;
					yearCount += 1;

					notifySubscribers(EVENT_TYPE.YEAR, yearCount);
				}

				notifySubscribers(EVENT_TYPE.SEASON, currentSeason());
			}
		}
	}

	// Build and return the service
	function init() {
		if (!initialized) {
			initialized = true;
			EventService.subscribe('timeService-tick', update);
		}
	}

	return {
		currentDay : currentDay,
		currentSeason : currentSeason,
		currentlyNight : currentlyNight,
		elapsedDays : elapsedDays,
		elapsedYears : elapsedYears,
		init : init,
		EVENT : EVENT_TYPE
	}
} ]);