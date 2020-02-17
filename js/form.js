'use strict';

(function () {
  var ENTER_KEY = 13;
  var MAP_PIN_ELEMENT_RADIUS = 78;
  var MAP_PIN_ELEMENT_OFFSET_X = 25;
  var MAP_PIN_ELEMENT_OFFSET_Y = 70;
  var LEFT_MOUSE_BUTTON = 1;
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

  var addPinClickListener = function (button, offer) {
    button.addEventListener('click', function () {
      window.render.addOffer(offer);
    });
  };

  var changesActiv = function () {
    for (var i = 0; i < allFormsElements.length; i++) {
      allFormsElements[i].removeAttribute('disabled');
    }
    for (var j = 0; j < pinElements.length; j++) {
      var button = pinElements[j];
      var offer = window.data.offersArrays[j];
      addPinClickListener(button, offer);
    }
    mapElement.classList.remove('map--faded');
    noticeFormElement.classList.remove('ad-form--disabled');
    mapPinElement.removeEventListener('mousedown', onMapPinElementMousedown);
    mapPinElement.removeEventListener('keydown', onMapPinElementKeydown);
    getAdressCoords(MAP_PIN_ELEMENT_OFFSET_X, MAP_PIN_ELEMENT_OFFSET_Y);
  };

  changesDisabled(allFormsElements);
  getAdressCoords(MAP_PIN_ELEMENT_RADIUS, MAP_PIN_ELEMENT_RADIUS);

  var onMapPinElementMousedown = function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      changesActiv(evt);
    }
  };

  var onMapPinElementKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      changesActiv(evt);
    }
  };

  mapPinElement.addEventListener('mousedown', onMapPinElementMousedown);
  mapPinElement.addEventListener('keydown', onMapPinElementKeydown);

})();
