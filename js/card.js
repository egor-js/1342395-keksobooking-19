'use strict';

(function () {
  var pinCardTemplate = document.querySelector('#card').content;
  var map = document.querySelector('.map');
  var beforeElement = map.querySelector('div.map__filters-container');
  var cardOpend = 0;
  // var pins = window.data.createPins();
  window.card = {
    close: function () {
      if (cardOpend) {
        map.removeChild(map.children[1]);
        cardOpend = 0;
      }
    },
    renderCard: function (evt) {
      var pinCards = document.createDocumentFragment();
      var pinId = evt.target.getAttribute('id');
      var closeCardCross = document.querySelector('button.popup__close');
      // var popupCard = document.querySelector('.map__card.popup');
      var mapOverlay = document.querySelector('.map__overlay');
      var redPin = document.querySelector('.map__pin.map__pin--main');
      var filterForm = document.querySelector('.map__filters-container');
      var mapTitle = document.querySelector('h2.map__title');
      // console.log(evt.target.value);
      // console.log(evt.target.offsetParent);

      if (cardOpend) {
        switch (evt.target) {
          case closeCardCross:
          case mapOverlay:
          case redPin:
          case filterForm:
          case mapTitle:
            window.card.close();
            // document.querySelector('#' + pinId).classList.remove('.map__pin--active');
            break;
          default:
        }
        if (pinId && pinId.indexOf('pinid') !== -1) {
          pinCards.appendChild(window.card.fillCardAd(window.dataPinsOriginal[window.data.getPinIdNumber(pinId)]));
          // var idForFind = '#' + pinId;
          // pinTemp; var pinTemp =
          map.removeChild(map.children[1]);
          document.querySelector('#' + pinId).classList.add('.map__pin--active');
          // document.querySelector('#' + pinId).classList.remove('.map__pin--active');
          map.insertBefore(pinCards, beforeElement);
        }
      }
      if (!cardOpend && pinId && pinId.indexOf('pinid') !== -1) { // evt.target === pin &&
        pinCards.appendChild(window.card.fillCardAd(window.dataPinsOriginal[window.data.getPinIdNumber(pinId)]));
        map.insertBefore(pinCards, beforeElement);
        document.querySelector('#' + pinId).classList.add('.map__pin--active');
        // document.querySelector('#' + pinId).classList.remove('.map__pin--active');
        cardOpend = 1;
      }
    },
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
      pinCardTemp.querySelector('.map__card.popup').replaceChild(featuresFragment, pinCardTemp.querySelector('.popup__features'));
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
