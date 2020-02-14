'use strict';

(function () {
  var ENTER_KEY = 13;
  var MAP_PIN_ELEMENT_RADIUS = 78;
  var MAP_PIN_ELEMENT_OFFSET_X = 25;
  var MAP_PIN_ELEMENT_OFFSET_Y = 70;
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinElement = mapPinsElement.querySelector('.map__pin--main');
  var pinElements = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  var allFormsElements = document.querySelectorAll('select, input, textarea');
  var noticeElement = document.querySelector('.notice');
  var noticeFormElement = document.querySelector('.ad-form');
  var noticeAdressInputElement = noticeElement.querySelector('#address');
  var mapPinElementCoords = {
    x: mapPinElement.offsetLeft,
    y: mapPinElement.offsetTop,
  };

  var changesDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
    }
  };

  var getAdressCoords = function (offsetX, offsetY) {
    noticeAdressInputElement.value = (mapPinElementCoords.x + offsetX) + ', ' + (mapPinElementCoords.y + offsetY);
  };

  var changCard = function (evt) {
    for (var i = 0; i < pinElements.length; i++) {
      if (evt.target.closest('BUTTON') === pinElements[i]) {
        window.main.addOffer(window.main.offersArrays[i]);
      }
    }
  };

  var changesActiv = function () {
    for (var i = 0; i < allFormsElements.length; i++) {
      allFormsElements[i].removeAttribute('disabled');
    }
    mapElement.classList.remove('map--faded');
    noticeFormElement.classList.remove('ad-form--disabled');
    mapPinElement.removeEventListener('mousedown', onMapPinElement);
    mapPinElement.removeEventListener('keydown', onMapPinElement);
    mapPinsElement.addEventListener('click', changCard);
    mapPinsElement.addEventListener('keydown', window.util.isEnterEvent(changCard));
    getAdressCoords(MAP_PIN_ELEMENT_OFFSET_X, MAP_PIN_ELEMENT_OFFSET_Y);
  };

  changesDisabled(allFormsElements);
  getAdressCoords(MAP_PIN_ELEMENT_RADIUS, MAP_PIN_ELEMENT_RADIUS);

  var onMapPinElement = function (evt) {
    if (evt.which === 1 || evt.keyCode === ENTER_KEY) {
      changesActiv(evt);
    }
  };

  mapPinElement.addEventListener('mousedown', onMapPinElement);
  mapPinElement.addEventListener('keydown', onMapPinElement);

})();
