angular.module("ponyApp").directive("artPanel", function () {
    return {
    	restrict: 'A',
    	scope: {
    		artname: "=art"
    	},
        template: "<pre>{{artname}}</pre>",
        link: function(scope, element) {

        }
    };
});