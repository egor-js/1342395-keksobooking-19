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
  for (var i = 1; i < genRandomInt(2, 4); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
  }
  return photos;
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
        type: PLACE_TYPE[genRandomInt(4)],
        rooms: genRandomInt(4),
        guests: genRandomInt(20),
        checkin: CHECKIN_TIME[genRandomInt(4)],
        checkout: CHECKOUT_TIME[genRandomInt(4)],
        features: PLACE_FEATURES[genRandomInt(6)],
        description: 'Описание предложения №' + i,
        photos: genPlacePhotos()
      },
      location: {
        x: genRandomInt(100, 1000), // диапазон координат по X
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

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(i));
}

mapPins.appendChild(fragment);
