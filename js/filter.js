'use strict';

(function () {
  window.filter = {
    byType: function (pins, param) {
      var pinsFiltfred = pins.filter(function (pin) {
        return pin.offer.type === param;
      });
      // console.log('pins filtred by type', pinsFiltfred);
      window.pinsFiltfred = pinsFiltfred;
      return pinsFiltfred;
    },
    byPrice: function (pins, param) {
      switch (param) {
        case 50000:
          var pinsFiltfred = pins.filter(function (pin) {
            return pin.offer.price >= 50000;
          });
          // console.log('pins filtred >= 50 000 ', pinsFiltfred);
          window.pinsFiltfred = pinsFiltfred;
          break;
        default:
      }
      return pinsFiltfred;
    }
  };
})();

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.addEventListener(function (evt) {
    var target = evt.target;
    console.log(target);
  });
})();
