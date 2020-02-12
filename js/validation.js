'use strict';

(function () {

  var MAX_PRICE = 1000000;
  var minPricePlaceholder = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var noticeFormElement = document.querySelector('.notice');
  var noticePriceElement = noticeFormElement.querySelector('#price');
  var noticeTypeElement = noticeFormElement.querySelector('#type');
  var noticeTimeElements = noticeFormElement.querySelector('.ad-form__element--time');
  var noticeTimeInElements = noticeTimeElements.querySelector('#timein');
  var noticeTimeOutElements = noticeTimeElements.querySelector('#timeout');

  noticePriceElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (Number(target.value) > MAX_PRICE) {
      target.setCustomValidity(
          'А ты хорош, начинающий бизнесмен! Пыл поумерь до ' +
        MAX_PRICE +
        ' деревянных.'
      );
    } else if (Number(target.value) < minPricePlaceholder[noticeTypeElement.value]) {
      target.setCustomValidity(
          'Дешевишь, бро! Меньше ' +
        minPricePlaceholder[noticeTypeElement.value] +
        ' низя.'
      );
    } else {
      target.setCustomValidity('');
    }
  });

  noticeTypeElement.addEventListener('change', function (evt) {
    noticePriceElement.placeholder = minPricePlaceholder[evt.target.value];
  });

  noticeTimeElements.addEventListener('change', function (evt) {
    if (evt.target.id === 'timein') {
      noticeTimeOutElements.selectedIndex = noticeTimeInElements.selectedIndex;
    } else {
      noticeTimeInElements.selectedIndex = noticeTimeOutElements.selectedIndex;
    }
  });

  var noticeRoomNumberElements = noticeFormElement.querySelector('#room_number');
  var noticeCapacityElements = noticeFormElement.querySelector('#capacity');
  var roomСapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

})();
