describe('Service: LoggerService', function() {
  beforeEach(module('ponyApp'));

  var ONE = "one";
  var TWO = "two";
  var THREE = "three"
  var EMPTY_QUEUE = [];
  var ONE_ITEM_QUEUE = [ONE];
  var MULT_ITEM_QUEUE = [ONE, THREE, TWO];

  var LoggerService;

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
  
  beforeEach(inject(function(_LoggerService_, _TimeService_) {
    LoggerService = _LoggerService_;
    TimeService = _TimeService_;
  }));
  
  // The tests
  it('Initialize', function() {
    LoggerService.init();
    
    expect(TimeService.subscribe).toHaveBeenCalled();
    expect(TimeService.sub).toBeDefined();
    expect(TimeService.sub).toBe(LoggerService);
  });
  
  it('Initial size is zero', function() {
    spyOn(LoggerService, 'list').and.callThrough();
    var result = LoggerService.list();

    expect(LoggerService.list).toHaveBeenCalled();
    expect(result).toEqual(EMPTY_QUEUE);
  });

  describe('Adding an item, ', function() {
    it('one item', function() {
      spyOn(LoggerService, 'add').and.callThrough();
      LoggerService.add(ONE);
      var list = LoggerService.list();

      expect(LoggerService.add).toHaveBeenCalled();
      expect(list).toEqual(ONE_ITEM_QUEUE);
    });
    
    it('multiple items', function() {
      spyOn(LoggerService, 'add').and.callThrough();
      LoggerService.add(ONE);
      LoggerService.add(THREE);
      LoggerService.add(TWO);
      var list = LoggerService.list();

      expect(LoggerService.add).toHaveBeenCalled();
      expect(list).toEqual(MULT_ITEM_QUEUE);
    });
  });
  
  describe('Clearning the queue, ', function() {
    it('empty', function() {
      spyOn(LoggerService, 'clear').and.callThrough();
      LoggerService.add(ONE);
      LoggerService.clear();
      var list = LoggerService.list();

      expect(LoggerService.clear).toHaveBeenCalled();
      expect(list).toEqual(EMPTY_QUEUE);
    });
    
    it('multiple items', function() {
      spyOn(LoggerService, 'clear').and.callThrough();
      LoggerService.add(ONE);
      LoggerService.add(THREE);
      LoggerService.add(TWO);
      LoggerService.clear();
      var list = LoggerService.list();

      expect(LoggerService.clear).toHaveBeenCalled();
      expect(list).toEqual(EMPTY_QUEUE);
    });
  });
});