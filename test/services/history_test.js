describe('Service: HistoryService', function() {
  beforeEach(module('ponyApp'));

  var ONE = "one";
  var TWO = "two";
  var THREE = "three"
  var EMPTY_QUEUE = [];
  var ONE_ITEM_QUEUE = [ONE];
  var MULT_ITEM_QUEUE = [ONE, THREE, TWO];

  var HistoryService;

  // Mock out the time service
  beforeEach(module('ponyApp', function($provide) {
    serv = {
      subscribe : function(subscriber) {
        this.sub = subscriber;
      }
    }

    spyOn(serv, 'subscribe').and.callThrough();

    $provide.value('TimeService', serv);
  }));
  
  beforeEach(inject(function(_HistoryService_, _TimeService_) {
    HistoryService = _HistoryService_;
    TimeService = _TimeService_;
  }));
  
  // The tests
  it('Initialize', function() {
    HistoryService.init();
    
    expect(TimeService.subscribe).toHaveBeenCalled();
    expect(TimeService.sub).toBeDefined();
    expect(TimeService.sub).toBe(HistoryService);
  });
  
  it('Initial size is zero', function() {
    spyOn(HistoryService, 'list').and.callThrough();
    var result = HistoryService.list();

    expect(HistoryService.list).toHaveBeenCalled();
    expect(result).toEqual(EMPTY_QUEUE);
  });

  describe('Adding an item, ', function() {
    it('one item', function() {
      spyOn(HistoryService, 'add').and.callThrough();
      HistoryService.add(ONE);
      var list = HistoryService.list();

      expect(HistoryService.add).toHaveBeenCalled();
      expect(list).toEqual(ONE_ITEM_QUEUE);
    });
    
    it('multiple items', function() {
      spyOn(HistoryService, 'add').and.callThrough();
      HistoryService.add(ONE);
      HistoryService.add(THREE);
      HistoryService.add(TWO);
      var list = HistoryService.list();

      expect(HistoryService.add).toHaveBeenCalled();
      expect(list).toEqual(MULT_ITEM_QUEUE);
    });
  });
  
  describe('Clearning the queue, ', function() {
    it('empty', function() {
      spyOn(HistoryService, 'clear').and.callThrough();
      HistoryService.add(ONE);
      HistoryService.clear();
      var list = HistoryService.list();

      expect(HistoryService.clear).toHaveBeenCalled();
      expect(list).toEqual(EMPTY_QUEUE);
    });
    
    it('multiple items', function() {
      spyOn(HistoryService, 'clear').and.callThrough();
      HistoryService.add(ONE);
      HistoryService.add(THREE);
      HistoryService.add(TWO);
      HistoryService.clear();
      var list = HistoryService.list();

      expect(HistoryService.clear).toHaveBeenCalled();
      expect(list).toEqual(EMPTY_QUEUE);
    });
  });
});