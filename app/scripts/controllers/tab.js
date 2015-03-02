'use strict';

angular.module('ponyApp').controller('TabController', ['$scope', '$location', function($scope, $location) {
	$scope.tabs = [{title:'Town', url:'town'}, 
				{title:'Roster', url:'roster'},
				{title:'Options', url:'options'},
				{title:'Achievements', url:'achievements'}];
	
	$scope.onTabSelected = function(url) {
		var route;
        if (typeof url === 'string') {
            switch (url) {
              default:
                route = 'tab/' + url;
                break;
            }
          }

          $location.path('/' + route);
	};
}]);