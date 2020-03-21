'use strict';

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
var addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x + CORRECTION_START_PIN_X;
var addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y + CORRECTION_START_PIN_Y;
form.address.value = addressX + ', ' + addressY;
form.address.setAttribute('placeholder', addressX + ', ' + addressY);

var fieldsetList = document.querySelector('.ad-form').querySelectorAll('fieldset');

for (var i = 0; i < fieldsetList.length; i++) {
  fieldsetList[i].setAttribute('disabled', '');
}
for (i = 0; i < filterForm.length; i++) {
  filterForm[i].setAttribute('disabled', '');
}

function onActivateMap(evt) {
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
    buttonStart.removeEventListener('mousedown', onActivateMap);
    buttonStart.removeEventListener('keydown', onActivateMap);

    window.renderPins(window.dataPinsOriginal);
    var mapFiltersForm = document.querySelector('form.map__filters');
    mapFiltersForm.addEventListener('input', function () {
      window.card.close();
      window.renderPins(window.filter.all(window.dataPinsOriginal));
    });
  }
}
function onDoAction(evt) {
  if (evt.key === 'Escape') {
    window.card.close();
  }
}
buttonStart.addEventListener('mousedown', onActivateMap);
buttonStart.addEventListener('keydown', onActivateMap);
buttonStart.addEventListener('mousedown', onMovePin);
document.addEventListener('click', window.card.renderCard);
document.addEventListener('keydown', onDoAction);

function onMovePin(evt) {
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
