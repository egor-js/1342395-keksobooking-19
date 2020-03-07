'use strict';

var pins = [];
var mapPins = document.querySelector('.map__pins');
var CORRECTION_RED_PIN_X = 32.5;
var CORRECTION_RED_PIN_Y = 80;
var CORRECTION_START_PIN_X = 32.5;
var CORRECTION_START_PIN_Y = 32.5;
var MAX_COORD_Y = 630;
var MIN_COORD_Y = 130;
var form = document.querySelector('form.ad-form');
var filterForm = document.querySelector('form.map__filters');
var buttonStart = document.querySelector('.map__pin.map__pin--main');
buttonStart.setAttribute('tabindex', '0');
form.address.setAttribute('readonly', '');
// console.log(parseInt(buttonStart.style.left));
// console.log(parseInt(buttonStart.style.top));
var addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x + CORRECTION_RED_PIN_X;
var addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y + CORRECTION_RED_PIN_Y;
form.address.value = addressX + ', ' + addressY;
form.address.setAttribute('placeholder', addressX + ', ' + addressY);

// функция создания и заполнения свойств объекта аренды
pins = window.data.createPins();
// var pinCards = document.createDocumentFragment();
// var map = document.querySelector('.map');

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
    form.address.value = addressX + ', ' + addressY;

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
  }
}
buttonStart.addEventListener('mousedown', activateMap);
buttonStart.addEventListener('keydown', activateMap);
document.addEventListener('click', window.card.renderCard);

function movePin(evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

  }
  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var finishCoords = {
      x: buttonStart.offsetLeft - shift.x,
      y: buttonStart.offsetTop - shift.y
    };
    if (finishCoords.x < -CORRECTION_RED_PIN_X) {
      finishCoords.x = -CORRECTION_RED_PIN_X;
    }
    if (finishCoords.x > mapPins.offsetWidth - CORRECTION_RED_PIN_X) {
      finishCoords.x = mapPins.offsetWidth - CORRECTION_RED_PIN_X;
    }
    if (finishCoords.y < MIN_COORD_Y - CORRECTION_RED_PIN_Y) {
      finishCoords.y = MIN_COORD_Y - CORRECTION_RED_PIN_Y;
    }
    if (finishCoords.y > MAX_COORD_Y - CORRECTION_RED_PIN_Y) {
      finishCoords.y = MAX_COORD_Y - CORRECTION_RED_PIN_Y;
    }
    console.log(buttonStart.offsetTop);
    buttonStart.style.top = finishCoords.y + 'px';
    buttonStart.style.left = finishCoords.x + 'px';

  }
  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x + CORRECTION_RED_PIN_X;
    addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y + CORRECTION_RED_PIN_Y;
    form.address.value = addressX + ', ' + addressY;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

buttonStart.addEventListener('mousedown', movePin);
