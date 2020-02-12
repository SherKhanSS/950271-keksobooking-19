'use strict';

(function () {

  var MAX_PRICE = 1000000;
  var MIN_FLAT = 1000;
  var MIN_HOUSE = 5000;
  var MIN_PALACE = 10000;
  var minPricePlaceholder = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var noticeFormElement = document.querySelector('.notice');
  var noticePriceElement = noticeFormElement.querySelector('#price');
  var noticeTypeElement = noticeFormElement.querySelector('#type');

  noticePriceElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value > MAX_PRICE) {
      target.setCustomValidity(
          'А ты хорош, начинающий бизнесмен. Пыл поумерь до ' +
        MAX_PRICE +
        ' деревянных.'
      );
    } else if (noticeTypeElement.value === 'flat' && target.value < MIN_FLAT) {
      target.setCustomValidity(
          'У тебя там что, комната в сарае? Добропорядочные люди меньше ' +
        MIN_FLAT +
        ' деревянных не берут.'
      );
    } else if (noticeTypeElement.value === 'house' && target.value < MIN_HOUSE) {
      target.setCustomValidity(
          'Совсем все плохо? Меньше ' +
        MIN_HOUSE +
        ' деревянных указать нельзя.'
      );
    } else if (noticeTypeElement.value === 'palace' && target.value < MIN_PALACE) {
      target.setCustomValidity(
          'Тебе никто не поверит! Нынче дворцы меньше чем за ' +
        MIN_PALACE +
        ' деревянных не стоят.'
      );
    } else {
      target.setCustomValidity('');
    }
  });
  // тут, похоже, можно через обьект свести условия к одному, но пока реализовать не смог

  noticeTypeElement.addEventListener('click', function (evt) {
    noticePriceElement.placeholder = minPricePlaceholder[evt.target.value];
  });

})();
