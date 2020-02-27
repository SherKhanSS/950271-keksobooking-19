'use strict';

(function () {
  var ENTER_KEY = 13;
  var MAP_PIN_ELEMENT_RADIUS = 78;
  var MAP_PIN_ELEMENT_OFFSET_X = 30;
  // по разметке 30, а не 25 =_=
  var MAP_PIN_ELEMENT_OFFSET_Y = 70;
  var LEFT_MOUSE_BUTTON = 1;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT_TOP = 130;
  var MAP_HEIGHT_BOTTOM = 630;
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinElement = mapPinsElement.querySelector('.map__pin--main');
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
      button.classList.add('map__pin--active');
    });
  };

  var onError = function (errorMessage) {
    // потом переписать в соответствии с ТЗ
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElem('afterbegin', node);
  };

  var changesActiv = function () {
    var pinElements = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allFormsElements.length; i++) {
      allFormsElements[i].removeAttribute('disabled');
    }
    var onSuccess = function (offers) {
      for (var j = 0; j < pinElements.length; j++) {
        var button = pinElements[j];
        var offer = offers[j];
        addPinClickListener(button, offer);
      }
    };
    window.backend.load(onSuccess, onError);
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
      changesActiv();
    }
  };

  var onMapPinElementKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      changesActiv();
    }
  };

  var onMapPinElementMousemove = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newShiftY = mapPinElement.offsetTop - shift.y;
      var newShiftX = mapPinElement.offsetLeft - shift.x;
      if (newShiftY < (MAP_HEIGHT_TOP - MAP_PIN_ELEMENT_OFFSET_Y)) {
        newShiftY = (MAP_HEIGHT_TOP - MAP_PIN_ELEMENT_OFFSET_Y);
      } else if (newShiftY > (MAP_HEIGHT_BOTTOM - MAP_PIN_ELEMENT_OFFSET_Y)) {
        newShiftY = (MAP_HEIGHT_BOTTOM - MAP_PIN_ELEMENT_OFFSET_Y);
      }
      if (newShiftX < -MAP_PIN_ELEMENT_OFFSET_X) {
        newShiftX = -MAP_PIN_ELEMENT_OFFSET_X;
      } else if (newShiftX > (MAP_WIDTH - MAP_PIN_ELEMENT_OFFSET_X)) {
        newShiftX = (MAP_WIDTH - MAP_PIN_ELEMENT_OFFSET_X);
      }
      // тут можно через Math.min и Max.max поменьше условий записать (Алексей)
      // исправить или посмотреть еще вариант решения из демо 8-й лекции
      mapPinElement.style.top = newShiftY + 'px';
      mapPinElement.style.left = newShiftX + 'px';
      mapPinElementCoords = {
        x: mapPinElement.offsetLeft,
        y: mapPinElement.offsetTop,
      };
      getAdressCoords(MAP_PIN_ELEMENT_OFFSET_X, MAP_PIN_ELEMENT_OFFSET_Y);
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinElement.addEventListener('mousedown', onMapPinElementMousedown);
  mapPinElement.addEventListener('keydown', onMapPinElementKeydown);
  mapPinElement.addEventListener('mousedown', onMapPinElementMousemove);

})();
