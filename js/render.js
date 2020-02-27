'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HIGHT = 70;

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
  var popupElement;
  var popupCloseElement;

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
      if (typeof array[i]['offer'] !== undefined) {
        fragment.appendChild(render(array[i]));
      }
    }
    return fragment;
  };

  var addPins = function (adverts) {
    mapPinsElement.appendChild(createFragment(adverts, renderPin));
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

  var offers = [];

  var onSuccess = function (data) {
    offers = data;
    addPins(offers);
  };

  window.backend.load(onSuccess, onError);

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

  var clearCard = function () {
    mapElement.querySelector('.popup').remove();
    mapPinsElement.querySelector('.map__pin--active').classList.remove('map__pin--active');
    // тут исключить поиск по селектору, решить проблему с переменной,
    // так как фунция, которая может ее создать,
    // находится в следующем модуле и доступа к ней не будет
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, clearCard);
  };

  var addCard = function (offer) {
    mapElement.insertBefore(renderCard(offer), mapFiltersContainerElement);
    popupElement = mapElement.querySelector('.popup');
    popupCloseElement = popupElement.querySelector('.popup__close');
    popupCloseElement.addEventListener('click', clearCard);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var addOffer = function (offer) {
    if (mapElement.querySelector('.popup') === null) {
      addCard(offer);
    } else {
      clearCard();
      addCard(offer);
    }
  };

  window.render = {
    addOffer: addOffer,
  };

})();
