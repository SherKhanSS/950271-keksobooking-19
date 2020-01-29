'use strict';

{
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
    "offer": {
      "title": строка, заголовок предложения
      "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": число, стоимость
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      "rooms": число, количество комнат
      "guests": число, количество гостей, которое можно разместить
      "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": строка с описанием,
      "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },

    "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
    }
}

var ADRESS_URL_FIRST_PART = 'img/avatars/user';
var ADRESS_URL_SECOND_PART = '.png';
var OFFERS_QUANTITY = 8;
var TITLES = [
  'Уютное гнездышко для молодоженов',
  'Старая хибара',
  'Пентхаус',
  'Клетка для голубей',
  'Жилье без регистрации и СМС',
  'Сдаю балкон',
  'Комната для интроверта',
  'Юрта для эскимоса',
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
var CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createAvatarUrls = function (quantity, firstString, secondString) {
  var newUrls = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    newUrls[i] = {
      firstString + i + secondString,
    };
  }
  return newUrls;
}

createAvatarUrls(OFFERS_QUANTITY, ADRESS_URL_FIRST_PART, ADRESS_URL_SECOND_PART);

var createAddress = function () {
  return getRandomInteger(0, 1000) + ', ' + getRandomInteger(0, 1000);
};

price: getRandomInteger(1000, 10000);
rooms: getRandomInteger(1, 5);
guests: getRandomInteger(1, 10);
