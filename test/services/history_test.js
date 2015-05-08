describe('Service: HistoryService', function() {
  beforeEach(module('ponyApp'));

  var ONE = "one";
  var TWO = "two";
  var THREE = "three"
  var EMPTY_QUEUE = [];
  var ONE_ITEM_QUEUE = [ONE];
  var MULT_ITEM_QUEUE = [ONE, THREE, TWO];

  var HistoryService;

  beforeEach(inject(function(_HistoryService_) {
    HistoryService = _HistoryService_;
  }));

  it('Loaded', function() {
    expect(HistoryService).toBeDefined();
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