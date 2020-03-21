'use strict';

(function () {
  var pinsFiltred = window.dataPinsOriginal; // window.dataPinsOriginal
  var mapFiltersForm = document.querySelector('form.map__filters');
  var housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');
  var filterType = mapFiltersForm.querySelector('#housing-type');
  var filterPrce = mapFiltersForm.querySelector('#housing-price');
  var filterRooms = mapFiltersForm.querySelector('#housing-rooms');
  var filterGuests = mapFiltersForm.querySelector('#housing-guests');
  var filterWifi = mapFiltersForm.querySelector('#filter-wifi');
  var filterDishwasher = mapFiltersForm.querySelector('#filter-dishwasher');
  var filterParking = mapFiltersForm.querySelector('#filter-parking');
  var filterWasher = mapFiltersForm.querySelector('#filter-washer');
  var filterElevator = mapFiltersForm.querySelector('#filter-elevator');
  var filterConditioner = mapFiltersForm.querySelector('#filter-conditioner');

  function featuresFind(pins, feature) {
    pinsFiltred = pins.filter(function (pin) {
      var featureInc = pin.offer.features.find(function (fe) {
        return fe === feature;
      });
      return featureInc ? true : false;
    });
    return pinsFiltred;
  }

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
      return pin.offer.rooms === filterRooms.value;
    },
    'housing-guests': function (pin) {
      return pin.offer.guests === filterGuests.value;
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
      var filtersPassed = false;
      var pinsFiltredNew = [];
      // var filtersTry = [];
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
      console.log(filters);
      // debugger;
      // console.log('filters.length ' + filters.length);
      for (var i = 0; i < pins.length; i++) {
        var filtersTry = [];
        for (var j = 0; j < filters.length; j++) {
          console.log(pins[i]);
          console.log(window.filterFunc[filters[j]](pins[i]));
          filtersTry.push(window.filterFunc[filters[j]](pins[i]));
          debugger;
        }
        console.log(filtersTry);
        filtersPassed = filtersTry.every(function (element) {
          return element === true;
        });
        debugger;
        if (filtersPassed) {
          pinsFiltredNew.push(pins[i]);
        }
      }
      // console.log('---------  j  ---------');
      // console.log('filters[j] ' + filters[j]);
      // // pinsFiltred =
      // console.log(pins[i]);
      // console.log(window.filterFunc[filters[j]](pins[i]));

      // console.log(window.filterFunc['housing-type'](pins[i]));
      // for (var i = 2; i < 4; i++) {
      //   if (mapFiltersForm.elements[i].value !== 'any') {
      //     filters.push(mapFiltersForm.elements[i].name);
      //   }
      // }
      // for (var i = 0; i < housingFeaturesFieldset.elements.length - 1; i++) {
      //   console.log('mapFiltersForm.elements[i].value ' + mapFiltersForm.elements[i].value);
      //   console.log('housingFeaturesFieldset.elements[i].checked ' + housingFeaturesFieldset.elements[i].checked + ' ' + housingFeaturesFieldset.elements[i].value);
      //   if (mapFiltersForm.elements[i].value && mapFiltersForm.elements[i].value !== 'any') {
      //     filters.push(mapFiltersForm.elements[i].value);
      //   }
      // if (housingFeaturesFieldset.elements[i].checked) {
      //   filters.push(housingFeaturesFieldset.elements[i].value);
      // }

      // console.log('---------------------------------');
      // console.log(pins[i].offer.features);
      // console.log(window.filterFunc['conditioner'](pins[i]));
      // console.log(pins[i].offer.type + ' = ' + selectType.value);
      // for (var j = 0; j < window.filterFunc.length; j++) {
      //   console.log('in for by j');
      //   window.filterFunc[j]();
      // }
      // console.log(window.filterFunc['housing-type'](pins[i]));
      // pinsFiltred = window.filter.byfetures(window.filter.byType(window.filter.byPrice(window.filter.byRooms(window.filter.byGuests(pins)))));
      // pinsFiltred = pins.slice();
      return pinsFiltredNew;

    },
    byfetures: function (pins) {
      for (var j = 0; j < housingFeaturesFieldset.elements.length; j++) {
        if (housingFeaturesFieldset.elements[j].checked) {
          pinsFiltred = featuresFind(pins, housingFeaturesFieldset.elements[j].value);
        }
      }
      return pinsFiltred;
    },
    byType: function (pins) {
      var param = filterType.value;
      pinsFiltred = pins.filter(function (pin) {
        if (param === 'any') {
          return true;
        } else {
          return pin.offer.type === param;
        }
      });
      window.renderPins(pinsFiltred);
      return pinsFiltred;
    },
    byPrice: function (pins) {
      var param = filterPrce.value;
      switch (param) {
        case 'any':
          pinsFiltred = pins.slice();
          break;
        case 'middle':
          pinsFiltred = pins.filter(function (pin) {
            return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
          });
          break;
        case 'low':
          pinsFiltred = pins.filter(function (pin) {
            return pin.offer.price < 10000;
          });
          break;
        case 'high':
          pinsFiltred = pins.filter(function (pin) {
            return pin.offer.price > 50000;
          });
          break;
        default:
          pinsFiltred = pins.slice();
          throw new Error('Неизвестное значение фильтра по стоимости:' + param);
      }
      return pinsFiltred;
    },
    byRooms: function (pins) {
      var param = filterRooms.value;
      pinsFiltred = pins.filter(function (pin) {
        var rooms = pin.offer.rooms + '';
        if (param === 'any') {
          return true;
        } else {
          return rooms === param;
        }
      });
      return pinsFiltred;
    },
    byGuests: function (pins) {
      var param = filterGuests.value;
      pinsFiltred = pins.filter(function (pin) {
        var guests = pin.offer.guests + '';
        if (param === 'any') {
          return true;
        } else {
          return guests === param;
        }
      });
      return pinsFiltred;
    },
  };

})();
