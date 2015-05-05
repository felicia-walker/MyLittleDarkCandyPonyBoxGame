describe('Service: HistoryService', function() {
  beforeEach(module('ponyApp'));

  var ONE = "one";
  var TWO = "two";

  var HistoryService;

  beforeEach(inject(function(_HistoryService_) {
    HistoryService = _HistoryService_;
  }));

  it('Loaded', function() {
    expect(HistoryService).toBeDefined();
  });
  
  xit('Initial size is zero', function() {
    spyOn(HistoryService, 'list');
    var result = HistoryService.list();

    expect(HistoryService.list).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  xdescribe('Adding an item, ', function() {
    it('one item', function() {
      spyOn(HistoryService, 'add');
      HistoryService.add(ONE);
      var list = HistoryService.list();

      expect(HistoryService.add).toHaveBeenCalled();
      expect(list.length).toBe(1);
    });
  });
});