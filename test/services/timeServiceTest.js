describe('Service: TimeService', function() {
  beforeEach(module('ponyApp'));

  var TimeService;

  beforeEach(inject(function(_TimeService_) {
    TimeService = _TimeService_;
  }));

  it('Pause and unpause', function() {
    spyOn(TimeService, 'pause').and.callThrough();
    spyOn(TimeService, 'unpause').and.callThrough();
    
    TimeService.pause();
    expect(TimeService.isPaused()).toBe(true);
    expect(TimeService.pause.calls.count()).toEqual(1);
    expect(TimeService.unpause.calls.count()).toEqual(0);
    
    TimeService.unpause();
    expect(TimeService.isPaused()).toBe(false);
    expect(TimeService.pause.calls.count()).toEqual(1);
    expect(TimeService.unpause.calls.count()).toEqual(1);
    
    TimeService.pause();
    expect(TimeService.isPaused()).toBe(true);
    expect(TimeService.pause.calls.count()).toEqual(2);
    expect(TimeService.unpause.calls.count()).toEqual(1);
  });
});