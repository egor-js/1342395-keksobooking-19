'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var CORRECTION_PIN_X = 25; // смещение по X от точки вставки тега "button" до середины картинки
  var CORRECTION_PIN_Y = 70; // смещение по Y от точки вставки тега "button" до хвостика внизу картинки
  window.renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('pin', '');
    pinElement.style = ('left: ' + (pin.location.x - CORRECTION_PIN_X) + 'px; top: ' + (pin.location.y - CORRECTION_PIN_Y) + 'px;');
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    return pinElement;
  };
})();
