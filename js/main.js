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
var RUS_TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};
var RUS_FEATURES = {
  'wifi': 'Wi-Fi',
  'dishwasher': 'Посудомоечная машина',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер',
};

var mapElement = document.querySelector('.map');
var mapPinsElement = mapElement.querySelector('.map__pins');
var pinTemplateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var pinCardElement = document.querySelector('#card')
        .content
        .querySelector('.map__card');
var popupPhotoElement = pinCardElement.querySelector('.popup__photo');
var popupFeaturElement = pinCardElement.querySelector('.popup__feature');
var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

var createLocations = function (quantity) {
  var locations = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    locations[i] = {
      x: window.util.getRandomInteger(0, MAP_WIDTH),
      y: window.util.getRandomInteger(MIN_COORDINATES, MAX_COORDINATES),
    };
  }
  return locations;
};

var locations = createLocations(OFFERS_QUANTITY);

var createOffersArray = function (quantity) {
  var newOffers = new Array(quantity);
  for (var i = 0; i < quantity; i++) {
    newOffers[i] = {
      author: {
        avatar: ADRESS_URL_FIRST_PART + (i + 1) + ADRESS_URL_SECOND_PART,
      },
      offer: {
        title: window.util.getRandomItem(TITLES),
        address: locations[i].x + ', ' + locations[i].y,
        price: window.util.getRandomInteger(1, 10) * COST_RATIO,
        type: window.util.getRandomItem(TYPES),
        rooms: window.util.getRandomInteger(1, 5),
        guests: window.util.getRandomInteger(1, 10),
        checkin: window.util.getRandomItem(CHECK_TIMES),
        checkout: window.util.getRandomItem(CHECK_TIMES),
        features: window.util.getRandomElements(FEATURES),
        description: window.util.getRandomItem(DESCRIPTIONS),
        photos: window.util.getRandomElements(PHOTOS),
      },
      location: {
        x: locations[i].x,
        y: locations[i].y,
      },
    };
  }
  return newOffers;
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
    if (typeof array[i]['offer'] !== 'undefined') {
      fragment.appendChild(render(array[i]));
    }
  }
  return fragment;
};

var addPins = function (adverts) {
  mapPinsElement.appendChild(createFragment(adverts, renderPin));
};

addPins(createOffersArray(OFFERS_QUANTITY));

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
  featurElement.classList.add('popup__feature--' + featur);
  featurElement.textContent = RUS_FEATURES[featur];
  return featurElement;
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

  if (typeof proffer.author.avatar === 'string') {
    cardElement.querySelector('.popup__avatar').src = proffer.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').style.display = 'none';
  }
  if (typeof proffer.offer.title === 'string') {
    cardElement.querySelector('.popup__title').textContent = proffer.offer.title;
  } else {
    cardElement.querySelector('.popup__title').style.display = 'none';
  }
  if (typeof proffer.offer.address === 'string') {
    cardElement.querySelector('.popup__text--address').textContent = proffer.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').style.display = 'none';
  }
  if (typeof proffer.offer.price === 'number') {
    cardElement.querySelector('.popup__text--price').textContent = proffer.offer.price + '₽/ночь';
  } else {
    cardElement.querySelector('.popup__text--price').style.display = 'none';
  }
  if (typeof proffer.offer.type === 'string') {
    cardElement.querySelector('.popup__type').textContent = RUS_TYPES[proffer.offer.type];
  } else {
    cardElement.querySelector('.popup__type').style.display = 'none';
  }
  if (typeof proffer.offer.rooms === 'number' && typeof proffer.offer.rooms === 'number') {
    cardElement.querySelector('.popup__text--capacity').textContent
    = proffer.offer.rooms + ' комнаты для ' + proffer.offer.guests + ' гостей';
  } else {
    cardElement.querySelector('.popup__text--capacity').style.display = 'none';
  }
  if (typeof proffer.offer.checkin === 'string' && typeof proffer.offer.checkout === 'string') {
    cardElement.querySelector('.popup__text--time').textContent
    = 'Заезд после ' + proffer.offer.checkin + ', выезд до ' + proffer.offer.checkout;
  } else {
    cardElement.querySelector('.popup__text--time').style.display = 'none';
  }
  if (typeof proffer.offer.features === 'object') {
    popupFeaturesElement.innerHTML = '';
    popupFeaturesElement.appendChild(getFeaturesFragment(proffer.offer.features));
  } else {
    popupFeaturesElement.style.display = 'none';
  }
  if (typeof proffer.offer.description === 'string') {
    cardElement.querySelector('.popup__description').textContent = proffer.offer.description;
  } else {
    cardElement.querySelector('.popup__description').style.display = 'none';
  }
  if (typeof proffer.offer.photos === 'object') {
    popupPhotosElement.innerHTML = '';
    popupPhotosElement.appendChild(getImgElements(proffer.offer.photos));
  } else {
    popupPhotosElement.style.display = 'none';
  }
  return cardElement;
};

// mapElement.insertBefore(renderCard(createOffersArray(OFFERS_QUANTITY)[0]), mapFiltersContainerElement);

var offersArray = createOffersArray(OFFERS_QUANTITY);
console.log(offersArray);
mapElement.insertBefore(renderCard(offersArray[0]), mapFiltersContainerElement);
