describe('Controller: HistoryController', function() {
  var EMPTY_QUEUE = [];
  var UNDER_QUEUE = ['one', 'two', 'three'];
  var UNDER_RESULT = ['three', 'two', 'one'];
  var OVER_QUEUE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
  var MAX_QUEUE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
  var OVER_MAX_RESULT = ['s', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'h', 'g', 'f', 'e', 'd'];

  var HistoryService;

  // Mock out the history service
  beforeEach(module('ponyApp', function($provide) {
    serv = {
      queue : [],
      list : function() {
        return serv.queue;
      }
    }

    spyOn(serv, 'list').and.callThrough();

    $provide.value('HistoryService', serv);
  }));

  beforeEach(inject(function($controller, _HistoryService_) {
    HistoryService = _HistoryService_;
    controller = $controller('HistoryController', {
      HistoryService : HistoryService
    });
  }));

  // Tests
  describe('History queue is ', function() {
    it('empty', function() {
      HistoryService.queue = EMPTY_QUEUE;
      var result = controller.get();

      expect(HistoryService.list).toHaveBeenCalled();
      expect(result).toEqual(EMPTY_QUEUE);
      expect(HistoryService.queue).toEqual(EMPTY_QUEUE);
    });

    it('below the max size', function() {
      HistoryService.queue = UNDER_QUEUE;
      var result = controller.get();

      expect(HistoryService.list).toHaveBeenCalled();
      expect(result).toEqual(UNDER_RESULT);
      expect(HistoryService.queue).toEqual(UNDER_QUEUE);
    });

    // The max is defined under HISTORY_SIZE in the history controller
    it('equal to the max size', function() {
      HistoryService.queue = MAX_QUEUE;
      var result = controller.get();

      expect(HistoryService.list).toHaveBeenCalled();
      expect(result).toEqual(OVER_MAX_RESULT);
      expect(HistoryService.queue).toEqual(MAX_QUEUE);
    });
    
    it('above the max size', function() {
      HistoryService.queue = OVER_QUEUE;
      var result = controller.get();

      expect(HistoryService.list).toHaveBeenCalled();
      expect(result).toEqual(OVER_MAX_RESULT);
      expect(HistoryService.queue).toEqual(OVER_QUEUE);
    });
  });
});