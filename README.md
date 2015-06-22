time-travel
===

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Does awesome stuff

#### Usage

```js
var timeTravel = require('time-travel');

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
  }, 500);
}, 500);
```


[npm-image]: https://img.shields.io/npm/v/time-travel.svg?style=flat-square
[npm-url]: https://npmjs.org/package/time-travel
[travis-image]: https://img.shields.io/travis/kolodny/time-travel.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/time-travel
[coveralls-image]: https://img.shields.io/coveralls/kolodny/time-travel.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/time-travel
[downloads-image]: http://img.shields.io/npm/dm/time-travel.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/time-travel
