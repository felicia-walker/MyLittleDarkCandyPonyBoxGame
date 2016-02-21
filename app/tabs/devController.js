'use strict';

angular.module('ponyApp').controller('DevController',
		[ '$scope', '$route', 'TimeService', 'CalendarService', function($scope, $route, TimeService, CalendarService) {
			var self = this;

			self.curTimes = [ {
				name : 'Total Days',
				value : CalendarService.elapsedDays()
			}, {
				name : 'Is night?',
				value : CalendarService.currentlyNight()
			}, {
				name : 'Current Season',
				value : CalendarService.currentSeason()
			}, {
				name : 'Total Years',
				value : CalendarService.elapsedYears()
			} ];

			self.update = function(type, value) {
				self.curTimes[type].value = value;
			}

			self.buttonText = "Start";

			self.start = function() {
				if (!TimeService.isStarted()) {
					self.buttonText = "Pause";
					TimeService.start();
				} else if (TimeService.isPaused()) {
					self.buttonText = "Pause";
					TimeService.unpause();
				} else {
					self.buttonText = "Unpause";
					TimeService.pause();
				}
			}

			// Self initialization
			self.init = function() {
				CalendarService.init();
				CalendarService.subscribe(self, CalendarService.EVENT.DAY);
				CalendarService.subscribe(self, CalendarService.EVENT.CYCLE);
				CalendarService.subscribe(self, CalendarService.EVENT.SEASON);
				CalendarService.subscribe(self, CalendarService.EVENT.YEAR);
			}

			self.init();
		} ]);