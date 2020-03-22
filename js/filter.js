'use strict';

(function () {
  var mapFiltersForm = document.querySelector('form.map__filters');
  var housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');
  var filterType = mapFiltersForm.querySelector('#housing-type');
  var filterPrce = mapFiltersForm.querySelector('#housing-price');
  var filterRooms = mapFiltersForm.querySelector('#housing-rooms');
  var filterGuests = mapFiltersForm.querySelector('#housing-guests');

  window.filterFunc = {
    'any': true,
    'housing-type': function (pin) {
      return pin.offer.type === filterType.value;
    },
    'housing-price': function (pin) {
      var param = filterPrce.value;
      var price = pin.offer.price;
      switch (param) {
        case 'middle':
          return price >= 10000 && price <= 50000;
        case 'low':
          return price < 10000;
        case 'high':
          return price > 50000;
        default:
          throw new Error('Неизвестное значение фильтра по стоимости:' + param);
      }
    },
    'housing-rooms': function (pin) {
      return pin.offer.rooms === parseInt(filterRooms.value, 10);
    },
    'housing-guests': function (pin) {
      return pin.offer.guests === parseInt(filterGuests.value, 10);
    },
    'wifi': function (pin) {
      return pin.offer.features.includes('wifi');
    },
    'dishwasher': function (pin) {
      return pin.offer.features.includes('dishwasher');
    },
    'parking': function (pin) {
      return pin.offer.features.includes('parking');
    },
    'washer': function (pin) {
      return pin.offer.features.includes('washer');
    },
    'elevator': function (pin) {
      return pin.offer.features.includes('elevator');
    },
    'conditioner': function (pin) {
      return pin.offer.features.includes('conditioner');
    }
  };
  window.filter = {
    all: function (pins) {
      var filters = [];
      var pinsFiltred = [];
      for (var i = 0; i < 4; i++) {
        if (mapFiltersForm.elements[i].value && mapFiltersForm.elements[i].value !== 'any') {
          filters.push(mapFiltersForm.elements[i].name);
        }
      }
      for (var i = 0; i < housingFeaturesFieldset.elements.length; i++) {
        if (housingFeaturesFieldset.elements[i].checked) {
          filters.push(housingFeaturesFieldset.elements[i].value);
        }
      }
      for (var i = 0; i < pins.length; i++) {
        var result = filters.every(function (filter) {
          return window.filterFunc[filter](pins[i]);
        });
        if (result) {
          pinsFiltred.push(pins[i]);
        }
        if (pinsFiltred.length === 5) {
          break;
        }
      }
      return pinsFiltred;
    },
    reset: function () {
      for (var i = 0; i < 4; i++) {
        mapFiltersForm.elements[i].value = 'any';
      }
      for (var i = 0; i < housingFeaturesFieldset.elements.length; i++) {
        housingFeaturesFieldset.elements[i].checked = false;
      }
    }
  };
})();
