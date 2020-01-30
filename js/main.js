'use strict';

var ADRESS_URL_FIRST_PART = 'img/avatars/user0';
var ADRESS_URL_SECOND_PART = '.png';
var OFFERS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HIGHT = 70;
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
var DESCRIPTIONS = [
  'Великолепная квартира-студия в центре Токио.',
  'Подходит как туристам, так и бизнесменам.',
  'Квартира полностью укомплектована и недавно отремонтирована.',
  'Можно заехать с домашними питомцами.',
  'Мы не против, если вы замутите у нас вечеринку.',
  'Только для славян.',
  'Оплату натурой не предлагать.',
  'Сказочным в заселении отказываем.',
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
var pinElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomItem = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomArray = function (array) {
  var newArray = new Array(getRandomInteger(0, array.length));
  for (var i = 0; i < newArray.length; i++) {
    newArray[i] = array[i];
  }
  return newArray;
};

var createAvatarUrls = function (quantity) {
  var newUrls = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    newUrls[i] = ADRESS_URL_FIRST_PART + (i + 1) + ADRESS_URL_SECOND_PART;
  }
  return newUrls;
};

var createOffersArray = function (quantity) {
  var newArray = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    newArray[i] = {
      author: {
        avatar: createAvatarUrls(OFFERS_QUANTITY)[i],
      },
      offer: {
        title: getRandomItem(TITLES),
        address: getRandomInteger(0, 1000) + ', ' + getRandomInteger(0, 1000),
        price: getRandomInteger(1000, 10000),
        type: getRandomItem(TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomItem(CHECK_TIMES),
        checkout: getRandomItem(CHECK_TIMES),
        features: getRandomArray(FEATURES),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomArray(PHOTOS),
      },
      location: {
        x: getRandomInteger(0, mapPinsElement.clientWidth),
        y: getRandomInteger(130, 630),
      },
    };
  }
  return newArray;
};

var renderOffers = function (proffer) {
  var offersElement = pinElement.cloneNode(true);
  offersElement.style = 'left:' + (proffer.location.x + (PIN_WIDTH / 2)) + 'px; top:'
  + (proffer.location.y + PIN_HIGHT) + 'px';
  offersElement.querySelector('img').src = proffer.author.avatar;
  offersElement.querySelector('img').alt = proffer.offer.title;
  return offersElement;
};

var addOffers = function (array, placement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderOffers(array[i]));
  }
  placement.appendChild(fragment);
};

addOffers(createOffersArray(OFFERS_QUANTITY), mapPinsElement);

mapElement.classList.remove('map--faded');
