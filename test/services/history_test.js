describe('Service: HistoryService', function() {
  beforeEach(module('ponyApp'));

  var ONE = "one";
  var TWO = "two";
  
  var serv;
  
  beforeEach(inject(function(_HistoryService_) {
	  serv = _HistoryService_;
  }));

  it('Initial size is zero', function() {
    expect(serv.list.length).toBe(0);
  });
  
  describe('Adding an item, ', function() {
//    it('one item', function() {
//    	serv.add(ONE).then(expect(serv.list.length).toBe(1));
//	});
  });
});