'use strict';

// TODO Allow current amt initialization
angular.module('ponyApp').factory('CalendarService', [ '$interval', function($interval) {
	var SEASONS = [ 'Spring', 'Summer', 'Autumn', 'Winter' ];

	// Base is 1 day/min, 15 days/season, 4 seasons/60 days/year with 30 sec per
	// night and day cycle
	var TICKS_PER_DAY = 60;
	var TICKS_PER_SUN = 30;
	var DAYS_PER_SEASON = 15;
	var DAY_MULT = .33;
	var CYCLE_MULT = .33;
	var SEASON_MULT = .33;

	var subscribersDay = [];
	var subscribersCycle = [];
	var subscribersSeason = [];
	var subscribersYear = [];

	var isNight = false;
	var cycleTicks = 0;
	var curSeasonIndex = 0;

	var elapsedDays = 0;
	var elapsedSeasons = 0;
	var elapsedYears = 0;
	
	var dayMult = DAY_MULT;
	var cycleMult = CYCLE_MULT;
	var seasonMult = SEASON_MULT;
	
	var ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult);
	var ticksPerSun = getRandomInt(DAYS_PER_SEASON, cycleMult);
	var daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);

	function getRandomInt(base, mult) {
		var offset = base * mult;
		var min = base - offset;
		var max = base + offset;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
	
	// Getters
	function currentSeason() {
		return SEASONS[curSeasonIndex];
	}

	function isNight() {
		return isNight;
	}

	function elapsedDays() {
		return elapsedDays;
	}

	function elapsedSeason() {
		return elapsedSeasons;
	}

	function elapsedYears() {
		return elapsedYears;
	}

	// Subscription management
	function subscribeDay(subscriber) {
		console.log("Calendar Service - added day subscriber");
		subscribersDay.push(subscriber);
	}

	function subscribeCycle(subscriber) {
		console.log("Calendar Service - added cycle subscriber");
		subscribersCycle.push(subscriber);
	}

	function subscribeSeason(subscriber) {
		console.log("Calendar Service - added season subscriber");
		subscribersSeason.push(subscriber);
	}

	function subscribeYear(subscriber) {
		console.log("Calendar Service - added year subscriber");
		subscribersYear.push(subscriber);
	}

	function unsubscribe(subscriberList, subscriber) {
		var len = subscriberList.length;
		for (var i = 0; i < len; i++) {
			if (subscriberList[i] === subscriber) {
				subscriberList(i, 1);
				return true;
			}
		}

		return false;
	}

	function unsubscribeDay(subscriber) {
		return unsubscribe(subscribersDay, subscriber);
	}

	function unsubscribeCyle(subscriber) {
		return unsubscribe(subscribersCycle, subscriber);
	}

	function unsubscribeSeason(subscriber) {
		return unsubscribe(subscribersSeason, subscriber);
	}

	function unsubscribeYear(subscriber) {
		return unsubscribe(subscribersYear, subscriber);
	}

	// Update and notification 
	function update(ticks) {
		if (ticks % ticksPerDay == 0) {
			elapsedDays += 1;
			cycleClicks += 0;
			isNight = false;
			ticksPerDay = getRandomInt(TICKS_PER_DAY, dayMult)

			notifySubscribers(subscribersDay, elapsedDays);
			notifySubscribers(subscribersCycle, isNight);
		}

		cycleTicks += 1;
		if (cycleTicks == ticksPerSun) {
			isNight = true;
			ticksPerSun = getRandomInt(TICKS_PER_Sun, cycleMult)

			notifySubscribers(subscribersCycle, isNight);
		}

		if (elapsedDays % daysPerSeason == 0) {
			elapsedSeasons += 1;
			curSeasonIndex += 1;
			daysPerSeason = getRandomInt(DAYS_PER_SEASON, seasonMult);

			notifySubscribers(subscribersSeason, currentSeason());
		}

		if (curSeasonIndex >= SEASONS.length) {
			curSeasonIndex = 0;
			elapsedYears += 1;

			notifySubscribers(subscribersYear, elapsedYears);
		}
	}

	function notifySubscribers(subscriberList, value) {
		var len = subscriberList.length;
		for (var i = 0; i < len; i++) {
			subscriberList[i].update(value);
		}
	}

	// Build and return the service
	function init() {
		TimeService.subscribe(this);
	}

	return {
		isNight : isNight,
		currentSeason: currentSeason,
		elapsedDays : elapsedDays,
		elapsedMonths : elapsedMonths,
		elapsedYears : elapsedYears,
		subscribeDay : subscribeDay,
		subscribeCycle : subscribeCycle,
		subscribeSeason : subscribeSeason,
		subscribeYear : subscribeYear,
		unsubscribeDay : unsubscribeDay,
		unsubscribeCycle : unsubscribeCycle,
		unsubscribeSeason : unsubscribeSeason,
		unsubscriberYear : unsubscribeYear
	}
} ]);