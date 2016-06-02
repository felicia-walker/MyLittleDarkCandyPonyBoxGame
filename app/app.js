var app = angular.module('ponyApp', ['ui.bootstrap', 'ngRoute']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/tab/town', {
			templateUrl: 'tabs/town.html'
		})
		.when('/tab/roster', {
			templateUrl: 'tabs/roster.html'
		})
		.when('/tab/options', {
			templateUrl: 'tabs/options.html'
		})
		.when('/tab/achievements', {
			templateUrl: 'tabs/achievements.html'
		})
		.when('/tab/dev', {
			templateUrl: 'tabs/dev.html'
		})
		.otherwise({
			redirectTo: '/tab/town'
		});
});