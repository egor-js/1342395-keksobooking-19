'use strict';

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var pinCardTemplate = document.querySelector('#card').content;
var pins = new Array(8);
var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CORRECTION_PIN_X = 25; // смещение по X от точки вставки тега "button" до середины картинки
var CORRECTION_PIN_Y = 70; // смещение по Y от точки вставки тега "button" до хвостика внизу картинки
var CORRECTION_RED_PIN_X = 32.5;
var CORRECTION_RED_PIN_Y = 80;
var CORRECTION_START_PIN_X = 32.5;
var CORRECTION_START_PIN_Y = 32.5;
var form = document.querySelector('form.ad-form'); // form.elements.one
var filterForm = document.querySelector('form.map__filters');
var buttonStart = document.querySelector('.map__pin.map__pin--main');
buttonStart.setAttribute('tabindex', '0');
form.address.setAttribute('readonly', '');
// console.log(parseInt(buttonStart.style.left));
// console.log(parseInt(buttonStart.style.top));
var addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x;
var addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y;
form.address.value = addressX + CORRECTION_START_PIN_X + ', ' + (addressY + CORRECTION_START_PIN_Y);
form.address.setAttribute('placeholder', addressX + CORRECTION_START_PIN_X + ', ' + (addressY + CORRECTION_START_PIN_Y));
form.title.setAttribute('maxlength', '100'); // required
form.title.setAttribute('minlength', '30');
form.title.setAttribute('required', '');
form.price.setAttribute('required', '');
form.price.setAttribute('max', '1000000');
form.capacity.selectedIndex = 2;

// console.log(pageYOffset);
// document.onclick = function (e) { // показывает координаты точки клика
//   addressInput.innerHTML = e.clientX + ':' + e.clientY;
//   console.log(e);
// };


var fieldsetList = document.querySelector('.ad-form').querySelectorAll('fieldset');
for (var i = 0; i < fieldsetList.length; i++) {
  fieldsetList[i].setAttribute('disabled', '');
}

for (i = 0; i < filterForm.length; i++) {
  filterForm[i].setAttribute('disabled', '');
}

function activateMap(evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    document.querySelector('.map').classList.remove('map--faded');
    // document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    form.classList.remove('ad-form--disabled');
    form.address.value = addressX + CORRECTION_RED_PIN_X + ', ' + (addressY + CORRECTION_RED_PIN_Y);

    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].removeAttribute('disabled', '');
    }

    for (var i = 0; i < filterForm.length; i++) {
      filterForm[i].removeAttribute('disabled', '');
    }

    buttonStart.removeEventListener('mousedown', activateMap);
    buttonStart.removeEventListener('keydown', activateMap);
  }
}

buttonStart.addEventListener('mousedown', activateMap);
buttonStart.addEventListener('keydown', activateMap);


form.timein.addEventListener('input', function (evt) {
  var target = evt.target;
  form.timeout.value = target.value;
});
form.timeout.addEventListener('input', function (evt) {
  var target = evt.target;
  form.timein.value = target.value;
  if (target.value === '14:00') {
    form.timeout.setCustomValidity('Время выезда' + target.value);
  } else {
    form.timeout.setCustomValidity('');
  }
});

form.room_number.addEventListener('input', function (evt) {
  form.capacity.setCustomValidity('');
  var target = evt.target;
  switch (target.value) {
    case '1':
      if (form.capacity.value !== '1') {
        target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '2':
      if (form.capacity.value === '2' || form.capacity.value === '1') {
        target.setCustomValidity('');
      } else {
        target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
      }
      break;
    case '3':
      if (form.capacity.value === '0') {
        target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '100':
      if (form.capacity.value !== '0') {
        target.setCustomValidity('100 комнат не для гостей');
      } else {
        target.setCustomValidity('');
      }
      break;
    default:
  }
});

form.capacity.addEventListener('input', function (evt) {
  form.room_number.setCustomValidity('');
  var target = evt.target;
  switch (target.value) {
    case '1':
      if (form.room_number.value === '100') {
        target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' слишком много комнат =)'); //  form.room_number.options[form.room_number.selectedIndex].textContent + ' не ' + form.capacity.options[form.capacity.selectedIndex].textContent)
      } else {
        target.setCustomValidity('');
      }
      break;
    case '2':
      if (form.room_number.value === '2' || form.room_number.value === '3') {
        target.setCustomValidity('');
      } else {
        target.setCustomValidity('Для 2 гостей нужно 2 или 3 комнаты'); // form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат'
      }
      break;
    case '3':
      if (form.room_number.value !== '3') {
        target.setCustomValidity('Для 3 гостей нужно 3 комнаты');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '0':
      if (form.room_number.value !== '100') {
        target.setCustomValidity('Не для гостей нужно 100 комнат');
      } else {
        target.setCustomValidity('');
      }
      break;
    default:
  }
});

// var pinCardTemplate = document.querySelector('#card').content;
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
        price: genRandomInt(1000, 50000),
        type: PLACE_TYPE[genRandomInt(PLACE_TYPE.length)],
        rooms: genRandomInt(1, 4),
        guests: genRandomInt(1, 20),
        checkin: CHECKIN_TIME[genRandomInt(CHECKIN_TIME.length - 1)],
        checkout: CHECKOUT_TIME[genRandomInt(CHECKOUT_TIME.length - 1)],
        features: genPlaceFeatures(),
        description: 'Описание предложения №' + i,
        photos: genPlacePhotos()
      },
      location: {
        x: genRandomInt(0, mapPins.offsetWidth), // диапазон координат по X
        y: genRandomInt(200, 655) // диапазон координат по Y "до горизонта" с учётом смещения
      }
    };
  }
};

createPins();

var renderPin = function (index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = ('left: ' + (pins[index].location.x - CORRECTION_PIN_X) + 'px; top: ' + (pins[index].location.y - CORRECTION_PIN_Y) + 'px;');
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
  var photosFragment = document.createDocumentFragment();
  for (i = 0; i < pins[index].offer.photos.length; i++) {
    var tempPhotoFragment = template.cloneNode(true);
    tempPhotoFragment.src = pins[index].offer.photos[i];
    photosFragment.appendChild(tempPhotoFragment);
  }
  return photosFragment;
};

var insertFeatures = function (index) {
  var featuresFragment = document.createDocumentFragment();
  var featuresFragmentUl = document.createElement('ul');
  featuresFragmentUl.classList.add('popup__features');
  for (i = 0; i < pins[index].offer.features.length; i++) {
    var featuresFragmentLi = document.createElement('li');
    var featuresLocal = '';
    featuresLocal = 'popup__feature--' + pins[index].offer.features[i];
    featuresFragmentLi.classList.add('popup__feature', featuresLocal);
    featuresFragmentUl.appendChild(featuresFragmentLi);
  }
  featuresFragment.appendChild(featuresFragmentUl);
  return featuresFragment;
};

var pinCards = document.createDocumentFragment();

var fillCardAd = function (index) {
  var pinCardTemp = document.createDocumentFragment();
  pinCardTemp = pinCardTemplate.cloneNode(true);
  var imgFromTemplate = pinCardTemp.querySelector('.popup__photos').querySelector('img');
  pinCardTemp.querySelector('.popup__title').textContent = pins[index].offer.title;
  pinCardTemp.querySelector('.popup__text--address').textContent = pins[index].offer.address;
  pinCardTemp.querySelector('.popup__text--price').innerHTML = pins[index].offer.price + '<span>₽/ночь</span>';
  pinCardTemp.querySelector('.popup__type').textContent = offerTypeTranslate(pins[index].offer.type);
  pinCardTemp.querySelector('.popup__text--capacity').textContent = pins[index].offer.rooms + ' комнаты для ' + pins[index].offer.guests + ' гостей';
  pinCardTemp.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[index].offer.checkin + ', выезд до ' + pins[index].offer.checkout;
  pinCardTemp.querySelector('.map__card.popup').replaceChild(insertFeatures(index), pinCardTemp.querySelector('.popup__features')); // pins[index].offer.features.join();
  pinCardTemp.querySelector('.popup__description').textContent = pins[index].offer.description;
  pinCardTemp.querySelector('.popup__photos').replaceChild(insertPhotos(imgFromTemplate, index), imgFromTemplate);
  pinCardTemp.querySelector('.popup__avatar').src = pins[index].author.avatar;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  // fragment.appendChild(renderPin(i));
}
mapPins.appendChild(fragment);

fillCardAd(genRandomInt(6)); // заполняем карточку случайного объявления

var map = document.querySelector('.map');
var beforeElement = map.querySelector('div.map__filters-container');
map.insertBefore(pinCards, beforeElement);
// console.log(pinCards);
// beforeElement.before(pinCards);
