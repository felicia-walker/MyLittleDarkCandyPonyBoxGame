angular.module('ponyApp').controller('DevController',
		[ '$scope', '$route', 'TimeService', 'CalendarService', 'EventService', 
		  function($scope, $route, TimeService, CalendarService, EventService) {
			
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

			self.update = function(event, value) {
				self.curTimes[event.name.slice(-1)].value = value;
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
				EventService.subscribe('calendarService-' + CalendarService.EVENT.DAY, self.update);
				EventService.subscribe('calendarService-' + CalendarService.EVENT.CYCLE, self.update);
				EventService.subscribe('calendarService-' + CalendarService.EVENT.SEASON, self.update);
				EventService.subscribe('calendarService-' + CalendarService.EVENT.YEAR, self.update);
			}

			self.init();
		} ]);