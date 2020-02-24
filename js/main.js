'use strict';

var pins = [];
var mapPins = document.querySelector('.map__pins');
var CORRECTION_RED_PIN_X = 32.5;
var CORRECTION_RED_PIN_Y = 80;
var CORRECTION_START_PIN_X = 32.5;
var CORRECTION_START_PIN_Y = 32.5;
var form = document.querySelector('form.ad-form');
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

// функция создания и заполнения свойств объекта аренды
pins = window.data.createPins();
var pinCards = document.createDocumentFragment();
var map = document.querySelector('.map');
var beforeElement = map.querySelector('div.map__filters-container');

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
    form.classList.remove('ad-form--disabled');
    form.address.value = addressX + CORRECTION_RED_PIN_X + ', ' + (addressY + CORRECTION_RED_PIN_Y);

    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].removeAttribute('disabled', '');
    }
    for (i = 0; i < filterForm.length; i++) {
      filterForm[i].removeAttribute('disabled', '');
    }
    buttonStart.removeEventListener('mousedown', activateMap);
    buttonStart.removeEventListener('keydown', activateMap);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var fragPin = window.renderPin(pins[i]);
      fragment.appendChild(fragPin);
    }
    mapPins.appendChild(fragment);
    map.removeChild(map.children[1]);
  }
}
pinCards.appendChild(window.card.fillCardAd(pins[window.data.randomInt(6)])); // заполняем карточку случайного объявления

buttonStart.addEventListener('mousedown', activateMap);
buttonStart.addEventListener('keydown', activateMap);

document.addEventListener('click', function (evt) {
  console.log(evt.target);
});

map.insertBefore(pinCards, beforeElement);
