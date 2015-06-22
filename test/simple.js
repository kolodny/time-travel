var assert = require('assert');
var timeTravel = require('..');

describe('time-travel', function() {

  it('calls the callback async-ly', function(done) {
    var thing = 1;
    timeTravel.setTimeout(function() {
      thing = 2;
      done();
    });
    assert.equal(thing, 1);
  });

  it('calls the callback pretty soon', function(done) {
    var startTime = new Date();
    timeTravel.setTimeout(function() {
      assert(new Date() - startTime < 10)
      done();
    });
  });

  it('calls the callback pretty soon, even with a long ms', function(done) {
    var startTime = new Date();
    timeTravel.setTimeout(function() {
      assert(new Date() - startTime < 10)
      done();
    }, 500);
  });

  it('calls the callbacks in the correct order', function(done) {
    var order = [];
    timeTravel.setTimeout(function() {
      order.push(2);
    }, 200);
    timeTravel.setTimeout(function() {
      order.push(1);
    }, 100);
    timeTravel.setTimeout(function() {
      assert.deepEqual(order, [1, 2]);
      done();
    }, 200);
  });

  it('handles nested setTimeouts', function(done) {
    var startTime = new Date();
    timeTravel.setTimeout(function() {
      timeTravel.setTimeout(function() {
        assert(new Date() - startTime < 10);
        done();
      }, 500);
    }, 500);
  });

  it('can keep track of fake Date objects', function(done) {
    var realStartTime = new Date();
    var fakeStartTime = new timeTravel.Date();
    timeTravel.setTimeout(function() {
      timeTravel.setTimeout(function() {
        var realEndTime = new Date();
        var realDiff = realEndTime - realStartTime;
        var fakeEndTime = new timeTravel.Date();
        var fakeDiff = fakeEndTime - fakeStartTime;
        assert(fakeDiff >= 1000 && fakeDiff < 1010);
        assert(realDiff < 10);
        done();
      }, 500);
    }, 500);
  });


});
