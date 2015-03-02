'use strict';

var app = angular.module('ponyApp', ['ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/tab/town', {
			templateUrl: 'views/town.html',
			controller: 'TownController'
		})
		.when('/tab/roster', {
			templateUrl: 'views/roster.html',
			controller: 'RosterController'
		})
		.when('/tab/options', {
			templateUrl: 'views/options.html',
			controller: 'OptionsController'
		})
		.when('/tab/achievements', {
			templateUrl: 'views/achievements.html',
			controller: 'AchievementsController'
		})
		.otherwise({
			redirectTo: '/tab/town'
		});
	});