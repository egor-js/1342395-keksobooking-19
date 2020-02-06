'use strict';

document.querySelector('.map').classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('.map__pin.map__pin--main');
var pins = [];
pins.length = 8;
var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CORRECTION_X = 33; // смещение по X от точки вставки тега "button" до середины картинки
var CORRECTION_Y = 78; // смещение по Y от точки вставки тега "button" до хвостика внизу картинки
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
// функция заполнения свойств объекта аренды
var createPins = function (index) {
  var avatarImg = 'img/avatars/user0' + (index + 1) + '.png';
  pins[index].author.avatar = avatarImg;
  pins[index].offer.title = 'Название объявления №' + index;
  pins[index].offer.address = '600, 350';
  pins[index].offer.price = genRandomInt(1000, 60000);
  pins[index].offer.type = PLACE_TYPE[genRandomInt(4)];
  pins[index].offer.rooms = genRandomInt(4);
  pins[index].offer.guests = genRandomInt(20);
  pins[index].offer.checkin = CHECKIN_TIME[genRandomInt(4)];
  pins[index].offer.checkout = CHECKOUT_TIME[genRandomInt(4)];
  pins[index].offer.features = PLACE_FEATURES[genRandomInt(6)];
  pins[index].offer.description = 'Описание предложения №' + index;
  pins[index].offer.photos = genPlacePhotos();
  pins[index].location.x = genRandomInt(100, 1000); // диапазон координат по X
  pins[index].location.y = genRandomInt(208, 663); // диапазон координат по Y "до горизонта" с учётом смещения
};
// цикл который создаёт объект и вызывывает функцию генерации параметров для каждого адреса
for (var i = 0; i < pins.length; i++) {
  pins[i] = {
    author: {},
    offer: {},
    location: {}
  };
  createPins(i);
}

var renderPin = function (index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = ('left: ' + (pins[index].location.x - CORRECTION_X) + 'px; top: ' + (pins[index].location.y - CORRECTION_Y) + 'px;');
  pinElement.querySelector('img').src = pins[index].author.avatar;
  pinElement.querySelector('img').alt = pins[index].offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(i));
}

mapPins.appendChild(fragment);
