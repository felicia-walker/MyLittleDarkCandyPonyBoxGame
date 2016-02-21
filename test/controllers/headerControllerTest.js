describe('Controller: HeaderController', function() {
	beforeEach(module('ponyApp'));

	var controller;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('HeaderController as ctrl', {
			$scope : scope
		});
	}));

	describe('Versions', function() {
		it(', major', function() {
			expect(scope.ctrl.major).toBe(0);
		});

		it(', minor', function() {
			expect(scope.ctrl.minor).toBe(2);
		});
	});
});