'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinElement = mapPinsElement.querySelector('.map__pin--main');
  var allFormsElements = document.querySelectorAll('select, input, textarea');

  mapElement.classList.remove('map--faded');
  // временно

  var changesDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
    }
  };

  var changesActiv = function (evt) {
    if (evt.which === 1) {
      for (var i = 0; i < allFormsElements.length; i++) {
        allFormsElements[i].removeAttribute('disabled');
      }
      mapPinElement.removeEventListener('mousedown', changesActiv);
    }
  };

  changesDisabled(allFormsElements);

  mapPinElement.addEventListener('mousedown', changesActiv);

  mapPinElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, changesActiv);
  });
  // тут я пока туплю,
  // TypeError: evt is undefinedform.js:19:9
  // changesActiv http://127.0.0.1:3000/js/form.js:19
  // isEnterEvent http://127.0.0.1:3000/js/util.js:29
  // <анонимный> http://127.0.0.1:3000/js/form.js:32

})();
