'use strict';

var ADRESS_URL_FIRST_PART = 'img/avatars/user0';
var ADRESS_URL_SECOND_PART = '.png';
var OFFERS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HIGHT = 70;
var MAP_WIDTH = 1200;
var MAX_COORDINATES = 630;
var MIN_COORDINATES = 130;
var COST_RATIO = 1000;
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
var pinTemplateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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


var createLocations = function (quantity) {
  var locations = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    locations[i] = {
      x: getRandomInteger(0, MAP_WIDTH),
      y: getRandomInteger(MIN_COORDINATES, MAX_COORDINATES),
    };
  }
  return locations;
};

var locations = createLocations(OFFERS_QUANTITY);

var createOffersArray = function (quantity) {
  var newOffer = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    newOffer[i] = {
      author: {
        avatar: ADRESS_URL_FIRST_PART + (i + 1) + ADRESS_URL_SECOND_PART,
      },
      offer: {
        title: getRandomItem(TITLES),
        address: locations[i].x + ', ' + locations[i].y,
        price: getRandomInteger(1, 10) * COST_RATIO,
        type: getRandomItem(TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomItem(CHECK_TIMES),
        checkout: getRandomItem(CHECK_TIMES),
        features: getRandomElements(FEATURES),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomElements(PHOTOS),
      },
      location: {
        x: locations[i].x,
        y: locations[i].y,
      },
    };
  }
  return newOffer;
};

var renderPin = function (advert) {
  var pinElement = pinTemplateElement.cloneNode(true);
  var imgElement = pinElement.querySelector('img');
  pinElement.style.left = (advert.location.x - (PIN_WIDTH / 2)) + 'px';
  pinElement.style.top = (advert.location.y - PIN_HIGHT) + 'px';
  imgElement.src = advert.author.avatar;
  imgElement.alt = advert.offer.title;
  return pinElement;
};

var createFragment = function (array, render) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(render(array[i]));
  }
  return fragment;
};

var addPins = function (adverts) {
  mapPinsElement.appendChild(createFragment(adverts, renderPin));
};

addPins(createOffersArray(OFFERS_QUANTITY));

// 3-я лекция 2-е задание наброски

var pinCardElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var popupPhotoElement = pinCardElement.querySelector('.popup__photo');
var popupFeaturElement = pinCardElement.querySelector('.popup__feature');
var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

var getRusType = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  }
  return 'Дворец';
};

var getImgElements = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var photoElement = popupPhotoElement.cloneNode(true);
    photoElement.src = array[i];
    fragment.appendChild(photoElement);
  }
  return fragment;
};

var getFeature = function (featur) {
  var featurElement = popupFeaturElement.cloneNode(true);
  featurElement.classList.remove('popup__feature--wifi');
  switch (featur) {
    case 'wifi':
      featurElement.classList.add('popup__feature--wifi');
      featurElement.textContent = 'Wi-Fi';
      return featurElement;
    case 'dishwasher':
      featurElement.classList.add('popup__feature--dishwasher');
      featurElement.textContent = 'Посудомоечная машина';
      return featurElement;
    case 'parking':
      featurElement.classList.add('popup__feature--parking');
      featurElement.textContent = 'Парковка';
      return featurElement;
    case 'washer':
      featurElement.classList.add('popup__feature--washer');
      featurElement.textContent = 'Стиральная машина';
      return featurElement;
    case 'elevator':
      featurElement.classList.add('popup__feature--elevator');
      featurElement.textContent = 'Лифт';
      return featurElement;
    case 'conditioner':
      featurElement.classList.add('popup__feature--conditioner');
      featurElement.textContent = 'Кондиционер';
      return featurElement;
    default:
      throw new Error('Неизвестное удобство: «' + featur + '»');
  }
};

var getFeaturesFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var feature = getFeature(array[i]);
    fragment.appendChild(feature);
  }
  return fragment;
};

var renderCard = function (proffer) {
  var cardElement = pinCardElement.cloneNode(true);
  var popupPhotosElement = cardElement.querySelector('.popup__photos');
  var popupFeaturesElement = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__avatar').src = proffer.author.avatar;
  cardElement.querySelector('.popup__title').textContent = proffer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = proffer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = proffer.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getRusType(proffer.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent
  = proffer.offer.rooms + ' комнаты для ' + proffer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent
  = 'Заезд после ' + proffer.offer.checkin + ', выезд до ' + proffer.offer.checkout;
  popupFeaturesElement.innerHTML = '';
  popupFeaturesElement.appendChild(getFeaturesFragment(proffer.offer.features));
  cardElement.querySelector('.popup__description').textContent = proffer.offer.description;
  popupPhotosElement.innerHTML = '';
  popupPhotosElement.appendChild(getImgElements(proffer.offer.photos));

  return cardElement;
};

mapElement.insertBefore(renderCard(createOffersArray(OFFERS_QUANTITY)[0]), mapFiltersContainerElement);
// как скрывать блоки без содержимого? каждой строке внутри renderCard добавить проверку на содержимое нужного ключа во входящем массиве с обьектами?

// 4-я лекция 1-е задание наброски

// var formElement = document.querySelector('.ad-form');
// var formFieldsetElements = formElement.querySelectorAll('fieldset');
//
// var changesDisabled = function (array) {
//   for (var i = 0; i < array.length; i++) {
//     array[i].setAttribute('disabled', 'disabled');
//   }
// };
//
// var changesAtiv = function (evt) {
//   if (evt.which === 1) {
//     for (var i = 0; i < formFieldsetElements.length; i++) {
//       formFieldsetElements[i].removeAttribute('disabled');
//     }
//     mapPinElement.removeEventListener('mousedown', changesAtiv);
//   }
// };
//
// changesDisabled(formFieldsetElements);
//
// mapPinElement.addEventListener('mousedown', changesAtiv);
