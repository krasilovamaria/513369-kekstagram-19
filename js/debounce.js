'use strict';
// модуль, который устраняет 'дребезг'
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    } lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
