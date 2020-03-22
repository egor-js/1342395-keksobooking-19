'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPins = document.querySelector('.map__pins');
  var CORRECTION_PIN_X = 25; // смещение по X от точки вставки "button" до середины картинки
  var CORRECTION_PIN_Y = 70; // смещение по Y от точки вставки "button" до хвостика внизу картинки
  window.pins = {
    removePins: function () {
      var k = mapPins.childNodes.length;
      for (var i = 5; i < k; i++) {
        mapPins.childNodes[5].remove();
      }
    },
    renderPins: function (pins) {
      window.pins.removePins();
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < Math.min(pins.length, 5); i++) {
        var pinElement = pinTemplate.cloneNode(true);
        if (!pins[i].offer) {
          continue;
        }
        pinElement.setAttribute('id', 'pinid' + pins[i].id);
        pinElement.style = ('left: ' + (pins[i].location.x - CORRECTION_PIN_X) + 'px; top: ' + (pins[i].location.y - CORRECTION_PIN_Y) + 'px;');
        pinElement.querySelector('img').src = pins[i].author.avatar;
        pinElement.querySelector('img').alt = pins[i].offer.title;
        pinElement.querySelector('img').setAttribute('id', 'pinid' + pins[i].id);
        fragment.appendChild(pinElement);
      }
      mapPins.appendChild(fragment);
    }
  };

})();
