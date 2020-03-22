'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  window.data = {
    getPinIdNumber: function (pinidText) {
      var idNumber = pinidText.replace('pinid', '');
      return idNumber;
    },
    randomInt: function (firstParam, secondParam) {
      if (!secondParam) {
        return Math.round(Math.random() * firstParam);
      } else {
        return Math.round(Math.random() * (secondParam - firstParam) + firstParam);
      }
    },
    debounce: function (cb) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
