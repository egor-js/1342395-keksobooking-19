'use strict';

(function () {
  var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var pins = new Array(8);
  var PLACE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var mapPins = document.querySelector('.map__pins');

  window.data = {
    randomInt: function (firstParam, secondParam) {
      if (!secondParam) {
        return Math.round(Math.random() * firstParam);
      } else {
        return Math.round(Math.random() * (secondParam - firstParam) + firstParam);
      }
    },
    placePhotos: function () {
      var photos = [];
      for (var i = 0; i < window.data.randomInt(1, 3); i++) {
        photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
      }
      return photos;
    },
    placeFeatures: function () {
      var features = [];
      for (var i = 0; i < PLACE_FEATURES.length; i++) {
        if (Math.random() > 0.5) {
          features.push(PLACE_FEATURES[i]);
        }
      }
      return features;
    },
    createPins: function () {
      for (var i = 0; i < pins.length; i++) {
        var avatarImg = 'img/avatars/user0' + (i + 1) + '.png';
        pins[i] = {
          id: i,
          author: {
            avatar: avatarImg
          },
          offer: {
            title: 'Название объявления №' + i,
            address: '600, 350',
            price: window.data.randomInt(1000, 50000),
            type: PLACE_TYPE[window.data.randomInt(PLACE_TYPE.length)],
            rooms: window.data.randomInt(1, 4),
            guests: window.data.randomInt(1, 20),
            checkin: CHECKIN_TIME[window.data.randomInt(CHECKIN_TIME.length - 1)],
            checkout: CHECKOUT_TIME[window.data.randomInt(CHECKOUT_TIME.length - 1)],
            features: window.data.placeFeatures(),
            description: 'Описание предложения №' + i,
            photos: window.data.placePhotos()
          },
          location: {
            x: window.data.randomInt(0, mapPins.offsetWidth), // диапазон координат по X
            y: window.data.randomInt(200, 655) // диапазон координат по Y "до горизонта" с учётом смещения
          }
        };
      }
      return pins;
    }
  };
})();
