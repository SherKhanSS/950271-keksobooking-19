'use strict';

(function () {

  var ADRESS_URL_FIRST_PART = 'img/avatars/user0';
  var ADRESS_URL_SECOND_PART = '.png';
  var OFFERS_QUANTITY = 8;
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

  var offersArrays = createOffersArray(OFFERS_QUANTITY);

  window.data = {
    offersArrays: offersArrays,
  };

})();
