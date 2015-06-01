'use strict';

angular.module('ponyApp').controller('HeaderController', ['$scope', function($scope) { 
  $scope.major = 0;
  $scope.minor = 2;
  $scope.links = [{title : "Reddit", link : "http://example.com/"},
                {title : "GitHub", link : "http://example.com/"}];
}]);