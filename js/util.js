'use strict';

(function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomItem = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var getRandomElements = function (array) {
    return array.slice(getRandomInteger(0, (array.length - 1), getRandomInteger(0, (array.length - 1))));
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem,
    getRandomElements: getRandomElements,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };

})();
