'use strict';

(function () {

  var MAX_PRICE = 1000000;
  var minPricePlaceholder = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var capacityOptionContents = {
    '1': [
      {text: 'для 1 гостя', value: '1'}
    ],
    '2': [
      {text: 'для 2 гостей', value: '2'},
      {text: 'для 1 гостя', value: '1'}
    ],
    '3': [
      {text: 'для 3 гостей', value: '3'},
      {text: 'для 2 гостей', value: '2'},
      {text: 'для 1 гостя', value: '1'}
    ],
    '100': [
      {text: 'не для гостей', value: '0'}
    ]
  };

  var noticeFormElement = document.querySelector('.notice');
  var noticePriceElement = noticeFormElement.querySelector('#price');
  var noticeTypeElement = noticeFormElement.querySelector('#type');
  var noticeTimeElements = noticeFormElement.querySelector('.ad-form__element--time');
  var noticeTimeInElements = noticeTimeElements.querySelector('#timein');
  var noticeTimeOutElements = noticeTimeElements.querySelector('#timeout');
  var noticeRoomNumberElements = noticeFormElement.querySelector('#room_number');
  var noticeCapacityElements = noticeFormElement.querySelector('#capacity');

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
          'Цена не может быть меньше ' +
        minPricePlaceholder[noticeTypeElement.value] +
        ' рублей.'
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

  var onRoomNumberSelectChange = function (evt) {
    var capacityOptions = capacityOptionContents[evt.target.value];
    noticeCapacityElements.innerHTML = '';

    capacityOptions.forEach(function (element) {
      var capacityOption = document.createElement('option');
      capacityOption.textContent = element.text;
      capacityOption.value = element.value;
      noticeCapacityElements.appendChild(capacityOption);
    });
  };

  noticeRoomNumberElements.addEventListener('change', onRoomNumberSelectChange);

})();
