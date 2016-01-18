describe('Controller: HeaderController', function() {
  beforeEach(module('ponyApp'));

  var controller;
  
  beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
	  controller = $controller('HeaderController', {$scope: scope});
  }));

  describe('Versions', function() {
	  it(', major', function() {
	    expect(scope.major).toBe(0);
	  });
	  
	  it(', minor', function() {
		expect(scope.minor).toBe(2);
	  });
  });
});