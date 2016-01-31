angular.module('ponyApp').directive('artPanel', function () {
    return {
        restrict: 'EA',       
        scope: {},
        template: '<pre>a' +
        	'b' +
        	'd'+
        	'e'+
        	'</pre>',
        controller: controllerFunction, 
        link: function ($scope, element, attrs) { } 
    }
});