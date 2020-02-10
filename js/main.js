'use strict';

document.querySelector('.map').classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var pins = new Array(8);
var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CORRECTION_X = 25; // смещение по X от точки вставки тега "button" до середины картинки
var CORRECTION_Y = 70; // смещение по Y от точки вставки тега "button" до хвостика внизу картинки
var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');
console.log(pinCardTemplate);
// функция генерации случайного положительного целого в заданных пределах, или от 0 до одного значения
var genRandomInt = function (firstParam, secondParam) {
  if (!secondParam) {
    return Math.round(Math.random() * firstParam);
  } else {
    return Math.round(Math.random() * (secondParam - firstParam) + firstParam);
  }
};
// генерация массива случайной длинны из ссылок на фотографии объекта аренды
var genPlacePhotos = function () {
  var photos = [];
  for (var i = 0; i < genRandomInt(1, 3); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return photos;
};
var genPlaceFeatures = function () {
  var features = [];
  for (var i = 0; i < PLACE_FEATURES.length; i++) {
    if (Math.random() > 0.5) {
      features.push(PLACE_FEATURES[i]);
    }
  }
  return features;
};
// функция создания и заполнения свойств объекта аренды
var createPins = function () {
  for (var i = 0; i < pins.length; i++) {
    var avatarImg = 'img/avatars/user0' + (i + 1) + '.png';
    pins[i] = {
      author: {
        avatar: avatarImg
      },
      offer: {
        title: 'Название объявления №' + i,
        address: '600, 350',
        price: genRandomInt(1000, 60000),
        type: PLACE_TYPE[genRandomInt(PLACE_TYPE.length)],
        rooms: genRandomInt(4),
        guests: genRandomInt(20),
        checkin: CHECKIN_TIME[genRandomInt(CHECKIN_TIME.length)],
        checkout: CHECKOUT_TIME[genRandomInt(CHECKOUT_TIME.length)],
        features: genPlaceFeatures(),
        description: 'Описание предложения №' + i,
        photos: genPlacePhotos()
      },
      location: {
        x: genRandomInt(50, mapPins.offsetWidth - 50), // диапазон координат по X
        y: genRandomInt(200, 655) // диапазон координат по Y "до горизонта" с учётом смещения
      }
    };
  }
};

createPins();

var renderPin = function (index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = ('left: ' + (pins[index].location.x - CORRECTION_X) + 'px; top: ' + (pins[index].location.y - CORRECTION_Y) + 'px;');
  pinElement.querySelector('img').src = pins[index].author.avatar;
  pinElement.querySelector('img').alt = pins[index].offer.title;
  return pinElement;
};

var offerTypeTranslate = function (type) {
  switch (type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    default:
      type = 'AnyAppartments';
  }
  return type;
};

var insertPhotos = function (template, index) {
  var tempPhotoFragment = new Array(pins[index].offer.photos.length);
  for (var i = 0; i < pins[index].offer.photos.length; i++) {
    // var liTemp = document.createDocumentFragment();
    tempPhotoFragment[i] = template.cloneNode(true);
    tempPhotoFragment[i].src = pins[index].offer.photos[i];
    tempPhotoFragment[i] = '<li>' + tempPhotoFragment[i] + '<li>';
  }
  return tempPhotoFragment;
};

var pinCards = new Array(pins.length);
var pinCardTemp = '';
var fillCardAd = function (index) {
  pinCardTemp = pinCardTemplate.cloneNode(true);
  // console.log(pinCardTemp.querySelector('.popup__photos').querySelector('img'));
  // pinCarsPhotos =
  pinCardTemp.querySelector('.popup__title').textContent = pins[index].offer.title;
  pinCardTemp.querySelector('.popup__text--address').textContent = pins[index].offer.address;
  pinCardTemp.querySelector('.popup__text--price').textContent = pins[index].offer.price + '₽/ночь';
  pinCardTemp.querySelector('.popup__type').textContent = offerTypeTranslate(pins[index].offer.type);
  pinCardTemp.querySelector('.popup__text--capacity').textContent = pins[index].offer.rooms + ' комнаты для ' + pins[index].offer.guests + ' гостей';
  pinCardTemp.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[index].offer.checkin + ', выезд до ' + pins[index].offer.checkout;
  pinCardTemp.querySelector('.popup__features').textContent = pins[index].offer.features.join();
  pinCardTemp.querySelector('.popup__description').textContent = pins[index].offer.description;
  // console.log(insertPhotos(pinCardTemp.querySelector('.popup__photos').querySelector('img'), index));
  // console.log(pinCardTemp.querySelector('.popup__photos'));
  pinCards[index] = pinCardTemp;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(i));
  fillCardAd(i);
}
mapPins.appendChild(fragment);

// console.log(pinCards);
