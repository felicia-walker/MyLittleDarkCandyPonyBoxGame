describe('Controller: HeaderController', function() {
  beforeEach(module('ponyApp'));

  var controller;
  
  beforeEach(inject(function($controller) {
	  controller = $controller('HeaderController', {});
  }));

  describe('Versions', function() {
	  it(', major', function() {
	    expect(controller.major).toBe(0);
	  });
	  
	  it(', minor', function() {
		expect(controller.minor).toBe(2);
	  });
  });
});