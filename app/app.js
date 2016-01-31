'use strict';

var app = angular.module('ponyApp', ['ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/tab/town', {
			templateUrl: 'tabs/town.html',
			controller: 'TownController',
		})
		.when('/tab/roster', {
			templateUrl: 'tabs/roster.html',
			controller: 'RosterController'
		})
		.when('/tab/options', {
			templateUrl: 'tabs/options.html',
			controller: 'OptionsController'
		})
		.when('/tab/achievements', {
			templateUrl: 'tabs/achievements.html',
			controller: 'AchievementsController'
		})
		.otherwise({
			redirectTo: '/tab/town'
		});
	});