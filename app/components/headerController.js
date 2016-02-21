'use strict';

angular.module('ponyApp').controller('HeaderController', ['$scope', function($scope) {
	var self = this;
	
	self.major = 0;
	self.minor = 2;
	self.links = [{title : "Reddit", link : "http://example.com/"},
                {title : "GitHub", link : "http://example.com/"}];
}]);