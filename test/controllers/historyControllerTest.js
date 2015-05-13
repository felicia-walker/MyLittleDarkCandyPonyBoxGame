describe('Controller: HistoryController', function() {
  var QUEUE_SIZE = 15;
  var EMPTY_QUEUE = [];
  var UNDER_QUEUE = ['one', 'two', 'three'];
  var UNDER_RESULT = ['three', 'two', 'one'];
  var OVER_QUEUE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
  var MAX_QUEUE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
  var OVER_MAX_RESULT = ['s', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'h', 'g', 'f', 'e', 'd'];

  var LoggerService;
  var controller;
  var scope;

  // Mock out the history service
  beforeEach(module('ponyApp', function($provide) {
    serv = {
      queue: [],
      init: function() {
        return true;
      },
      subscribe: function() {
        return true;
      },
      list: function() {
        return serv.queue;
      }
    }

    spyOn(serv, 'list').and.callThrough();

    $provide.value('LoggerService', serv);
  }));

  beforeEach(inject(function($controller, $rootScope, _LoggerService_) {
    LoggerService = _LoggerService_;
    scope = $rootScope.$new();
    
    controller = $controller('HistoryController', {
      LoggerService: LoggerService,
      $scope: scope
    });
    controller.queueLength = QUEUE_SIZE;
  }));

  // Tests
  describe('Logger queue is ', function() {
    it('empty', function() {
      LoggerService.queue = EMPTY_QUEUE;
      controller.update();

      expect(LoggerService.list).toHaveBeenCalled();
      expect(controller.queue).toEqual(EMPTY_QUEUE);
      expect(LoggerService.queue).toEqual(EMPTY_QUEUE);
    });

    it('below the max size', function() {
      LoggerService.queue = UNDER_QUEUE;
      controller.update();

      expect(LoggerService.list).toHaveBeenCalled();
      expect(controller.queue).toEqual(UNDER_RESULT);
      expect(LoggerService.queue).toEqual(UNDER_QUEUE);
    });

    // The max is defined under HISTORY_SIZE in the history controller
    it('equal to the max size', function() {
      LoggerService.queue = MAX_QUEUE;
      controller.update();

      expect(LoggerService.list).toHaveBeenCalled();
      expect(controller.queue).toEqual(OVER_MAX_RESULT);
      expect(LoggerService.queue).toEqual(MAX_QUEUE);
    });
    
    it('above the max size', function() {
      LoggerService.queue = OVER_QUEUE;
      controller.update();

      expect(LoggerService.list).toHaveBeenCalled();
      expect(controller.queue).toEqual(OVER_MAX_RESULT);
      expect(LoggerService.queue).toEqual(OVER_QUEUE);
    });
  });
});