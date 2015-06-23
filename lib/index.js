var sorted = require('sorted');

// save references in case someone overwrites the globals later
var $SetTimeout = setTimeout;
var $Date = Date;

var timeTravelOffset = 0;
var timeline = {};
var nextSchedules = sorted();
var timer;

exports.setTimeout = function(fn, ms) {
  schedule(timeTravelOffset + (ms || 0), fn);
  if (!timer) {
    timer = $SetTimeout(flushScheduled);
  }
}

exports.Date = function() {
  return new $Date(+new $Date() + timeTravelOffset);
}

function schedule(when, fn) {
  timeline[when] = timeline[when] || [];
  timeline[when].push(fn);
  nextSchedules.push(when);
}

function flushScheduled() {
  timeTravelOffset = nextSchedules.shift();
  var fns = timeline[timeTravelOffset];
  timeline[timeTravelOffset] = [];
  if (nextSchedules.length) {
    timer = $SetTimeout(flushScheduled);
  } else {
    timer = null;
  }
  fns.forEach(function(fn) {
    fn();
  });
}
