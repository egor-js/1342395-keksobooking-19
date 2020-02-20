'use strict';

(function () {
  var pinCardTemplate = document.querySelector('#card').content;
  window.card = {
    offerTypeTranslate: function (type) {
      switch (type) {
        case 'flat':
          type = 'Квартира';
          break;
        case 'house':
          type = 'Дом';
          break;
        case 'bungalo':
          type = 'Бунгало';
          break;
        case 'palace':
          type = 'Дворец';
          break;
        default:
          type = 'AnyAppartments';
      }
      return type;
    },
    fillCardAd: function (pin) {
      var pinCardTemp = document.createDocumentFragment();
      var photosFragment = document.createDocumentFragment();
      pinCardTemp = pinCardTemplate.cloneNode(true);
      var imgFromTemplate = pinCardTemp.querySelector('.popup__photos').querySelector('img');
      var featuresFragment = document.createDocumentFragment();
      var featuresFragmentUl = document.createElement('ul');
      featuresFragmentUl.classList.add('popup__features');
      pinCardTemp.querySelector('.popup__title').textContent = pin.offer.title;
      pinCardTemp.querySelector('.popup__text--address').textContent = pin.offer.address;
      pinCardTemp.querySelector('.popup__text--price').innerHTML = pin.offer.price + '<span>₽/ночь</span>';
      pinCardTemp.querySelector('.popup__type').textContent = window.card.offerTypeTranslate(pin.offer.type);
      pinCardTemp.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
      pinCardTemp.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
      for (i = 0; i < pin.offer.features.length; i++) {
        var featuresFragmentLi = document.createElement('li');
        var featuresLocal = '';
        featuresLocal = 'popup__feature--' + pin.offer.features[i];
        featuresFragmentLi.classList.add('popup__feature', featuresLocal);
        featuresFragmentUl.appendChild(featuresFragmentLi);
      }
      featuresFragment.appendChild(featuresFragmentUl);
      pinCardTemp.querySelector('.map__card.popup').replaceChild(featuresFragment, pinCardTemp.querySelector('.popup__features')); // pins[index].offer.features.join();
      pinCardTemp.querySelector('.popup__description').textContent = pin.offer.description;
      for (var i = 0; i < pin.offer.photos.length; i++) {
        var tempPhotoFragment = imgFromTemplate.cloneNode(true);
        tempPhotoFragment.src = pin.offer.photos[i];
        photosFragment.appendChild(tempPhotoFragment);
      }
      pinCardTemp.querySelector('.popup__photos').replaceChild(photosFragment, imgFromTemplate);
      pinCardTemp.querySelector('.popup__avatar').src = pin.author.avatar;
      return pinCardTemp;
    }
  };

})();
