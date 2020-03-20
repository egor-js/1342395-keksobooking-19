'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPins = document.querySelector('.map__pins');
  var CORRECTION_PIN_X = 25; // смещение по X от точки вставки тега "button" до середины картинки
  var CORRECTION_PIN_Y = 70; // смещение по Y от точки вставки тега "button" до хвостика внизу картинки
  window.removePins = function () {
    var k = mapPins.childNodes.length;
    for (var i = 5; i < k; i++) {
      mapPins.childNodes[5].remove();
    }
  };
  window.renderPins = function (pins) {
    // console.log(document.querySelectorAll('.map__pin'));

    // console.log(mapPins.childNodes.length);
    // console.log('pins from window.renderPins', pins);
    window.removePins();
    var fragment = document.createDocumentFragment();
    var l = 0;
    l = pins.length > 5 ? 5 : pins.length;
    for (var i = 0; i < l; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.setAttribute('id', 'pinid' + pins[i].id);
      pinElement.style = ('left: ' + (pins[i].location.x - CORRECTION_PIN_X) + 'px; top: ' + (pins[i].location.y - CORRECTION_PIN_Y) + 'px;');
      pinElement.querySelector('img').src = pins[i].author.avatar;
      pinElement.querySelector('img').alt = pins[i].offer.title;
      pinElement.querySelector('img').setAttribute('id', 'pinid' + pins[i].id);
      fragment.appendChild(pinElement);
      // console.log('pinElement from window.renderPins', pinElement);
    }
    mapPins.appendChild(fragment);
  };

  function successHandler(pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].id = i;
    }
    window.dataPinsOriginal = pins;
  }

  window.load(successHandler);
})();
