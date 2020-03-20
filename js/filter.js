'use strict';

(function () {
  var pinsFiltfred = window.dataPinsOriginal;
  var mapFiltersForm = document.querySelector('form.map__filters');
  var selectType = mapFiltersForm.querySelector('#housing-type');
  var selectPrce = mapFiltersForm.querySelector('#housing-price');
  var selectRooms = mapFiltersForm.querySelector('#housing-rooms');
  var selectGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');
  var selectFeatureWiFi = mapFiltersForm.querySelector('#filter-wifi');
  var selectFeatureDishwasher = mapFiltersForm.querySelector('#filter-dishwasher');
  var selectFeatureParking = mapFiltersForm.querySelector('#filter-parking');
  var selectFeatureWasher = mapFiltersForm.querySelector('#filter-washer');
  var selectFeatureElevator = mapFiltersForm.querySelector('#filter-elevator');
  var selectFeatureConditioner = mapFiltersForm.querySelector('#filter-conditioner');

  // console.log(housingFeatures.elements[4]);

  function featuresFind(pins, feature) {
    pinsFiltfred = pins.filter(function (pin) {
      var featureInc = pin.offer.features.find(function (fe) {
        return fe === feature;
      });
      return featureInc ? true : false;
    });
    return pinsFiltfred;
    // return featureInc ? true : false; // wifi
  }

  window.filter = {
    all: function (pins) {
      pinsFiltfred = window.filter.byfetures(window.filter.byType(window.filter.byPrice(window.filter.byRooms(window.filter.byGuests(pins)))));

      // debugger;
      // window.filter.byfetures(pinsFiltfred);

      // console.log(selectType.value + ' ' + selectPrce.value + ' ' + selectRooms.value + ' ' + selectFeatureWiFi.checked + ' ' + selectFeatureDishwasher.checked);
      return pinsFiltfred;
    },
    byfetures: function (pins) {

      // console.log(selectFeatureWiFi.checked + ' ' + selectFeatureDishwasher.checked + ' ' + selectFeatureParking.checked + ' ' + selectFeatureWasher.checked + ' ' + selectFeatureElevator.checked + ' ' + selectFeatureConditioner.checked);
      for (var j = 0; j < housingFeaturesFieldset.elements.length; j++) {
        if (housingFeaturesFieldset.elements[j].checked) {
          pinsFiltfred = featuresFind(pins, housingFeaturesFieldset.elements[j].value);
          // if (featuresFind(pins[i], housingFeaturesFieldset.elements[j].value)) {
          // //  console.log(pins[i]);
          // // console.log(housingFeaturesFieldset.elements[j].value + ' is ' + featuresFind(pins[i], housingFeaturesFieldset.elements[j].value));
          // }
        } else {
          continue;
        }
        // console.log(pins[i]);
      // console.log(housingFeatures.elements[j].value + ' is ' + featuresFind(pins[i], housingFeatures.elements[j].value));
      }
      //  console.log(featuresFind(pins[i], 'wifi'));
      return pinsFiltfred;
    },
    byType: function (pins) {
      var param = selectType.value;
      pinsFiltfred = pins.filter(function (pin) {
        if (param === 'any') {
          return true;
        } else {
          return pin.offer.type === param;
        }
      });
      window.pinsFiltfred = pinsFiltfred.slice();
      window.renderPins(pinsFiltfred);
      return pinsFiltfred;
    },
    byPrice: function (pins) {
      var param = selectPrce.value;
      switch (param) {
        case 'middle':
          pinsFiltfred = pins.filter(function (pin) {
            return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
          });
          break;
        case 'low':
          pinsFiltfred = pins.filter(function (pin) {
            return pin.offer.price < 10000;
          });
          break;
        case 'high':
          pinsFiltfred = pins.filter(function (pin) {
            return pin.offer.price > 50000;
          });
          window.pinsFiltfred = pinsFiltfred.slice();
          break;
        default:
          pinsFiltfred = pins.slice();
          window.pinsFiltfred = pinsFiltfred.slice();
      }
      return pinsFiltfred;
    },
    byRooms: function (pins) {
      var param = selectRooms.value;
      pinsFiltfred = pins.filter(function (pin) {
        var rooms = pin.offer.rooms + '';
        if (param === 'any') {
          return true;
        } else {
          return rooms === param;
        }
      });
      return pinsFiltfred;
    },
    byGuests: function (pins) {
      var param = selectGuests.value;
      pinsFiltfred = pins.filter(function (pin) {
        var guests = pin.offer.guests + '';
        if (param === 'any') {
          return true;
        } else {
          return guests === param;
        }
      });
      return pinsFiltfred;
    },
  };
})();

(function () {

})();
