'use strict';

(function () {
  var CORRECTION_RED_PIN_X = 32.5; // красная метка выбора адреса для пользовательского объявления
  var CORRECTION_RED_PIN_Y = 80;
  var CORRECTION_START_PIN_X = 32.5; // метка при неактивном режиме
  var CORRECTION_START_PIN_Y = 32.5;
  var MAX_COORD_Y = 630 - CORRECTION_RED_PIN_Y;
  var MIN_COORD_Y = 130 - CORRECTION_RED_PIN_Y;
  var main = document.querySelector('main');
  var mainDiv = main.querySelector('div');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var form = document.querySelector('form.ad-form');
  var resetButton = form.querySelector('.ad-form__reset');
  var buttonStart = document.querySelector('.map__pin.map__pin--main');
  var mapFiltersForm = document.querySelector('form.map__filters');
  var addressX = 0;
  var addressY = 0;

  window.main = {
    setPageInactive: function () {
      window.pins.removePins();
      window.scrollTo(0, 0);
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      form.address.setAttribute('readonly', '');
      form.address.value = addressX + ', ' + addressY;
      form.address.setAttribute('placeholder', addressX + ', ' + addressY);
      form.title.value = '';
      form.description.value = '';
      form.type.value = 'flat';
      form.price.value = '';
      form.timein.value = '12:00';
      form.timeout.value = '12:00';
      form.rooms.value = '1';
      form.capacity.value = '1';
      buttonStart.style.top = '375px';
      for (var i = 18; i < 24; i++) {
        form.elements[i].checked = false;
      }
      buttonStart.style.left = '570px';
      buttonStart.setAttribute('tabindex', '0');
      addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x + CORRECTION_START_PIN_X;
      addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y + CORRECTION_START_PIN_Y;

      buttonStart.addEventListener('mousedown', onActivateMap);
      buttonStart.addEventListener('keydown', onActivateMap);
      window.form.setFormInactive();
      window.filter.setFiltersInactive();
      window.filter.reset();
      window.load.download(onSuccessDownload, onErrorDownload);
    }
  };
  window.main.setPageInactive();
  function onActivateMap(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      document.querySelector('.map').classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      form.address.value = addressX + ', ' + addressY;
      window.form.setFormActive();
      buttonStart.removeEventListener('mousedown', onActivateMap);
      buttonStart.removeEventListener('keydown', onActivateMap);
      if (window.downloadSuccess) {
        window.pins.renderPins(window.dataPinsOriginal);
        window.filter.setFiltersActive();
      }
      mapFiltersForm.addEventListener('input', function () {
        window.card.close();
        window.data.debounce(window.pins.renderPins(window.filter.all(window.dataPinsOriginal)));
      });
      resetButton.addEventListener('click', function (evtRes) {
        window.card.close();
        evtRes.preventDefault();
        window.main.setPageInactive();
      });
    }
  }
  function onCloseCardByEscape(evt) {
    if (evt.key === 'Escape') {
      window.card.close();
      if (main.querySelector('.success')) {
        main.removeChild(main.querySelector('.success'));
        window.main.setPageInactive();
        window.scrollTo(0, 0);
      }
      if (main.querySelector('.error')) {
        main.removeChild(main.querySelector('.error'));
      }
    }
  }
  buttonStart.addEventListener('mousedown', onMovePin);
  document.addEventListener('click', window.card.renderCard);
  document.addEventListener('keydown', onCloseCardByEscape);
  function onMovePin(evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
    }
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var finishCoords = {
        x: buttonStart.offsetLeft - shift.x,
        y: buttonStart.offsetTop - shift.y
      };
      if (finishCoords.x < -CORRECTION_RED_PIN_X) {
        finishCoords.x = -CORRECTION_RED_PIN_X;
      }
      if (finishCoords.x > mapPins.offsetWidth - CORRECTION_RED_PIN_X) {
        finishCoords.x = mapPins.offsetWidth - CORRECTION_RED_PIN_X;
      }
      if (finishCoords.y < MIN_COORD_Y) {
        finishCoords.y = MIN_COORD_Y;
      }
      if (finishCoords.y > MAX_COORD_Y) {
        finishCoords.y = MAX_COORD_Y;
      }
      buttonStart.style.top = finishCoords.y + 'px';
      buttonStart.style.left = finishCoords.x + 'px';
    }
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      addressX = buttonStart.getBoundingClientRect().x - mapPins.getBoundingClientRect().x + CORRECTION_RED_PIN_X;
      addressY = buttonStart.getBoundingClientRect().y - mapPins.getBoundingClientRect().y + CORRECTION_RED_PIN_Y;
      form.address.value = addressX + ', ' + addressY;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  function onSuccessDownload(pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].id = i;
    }
    window.dataPinsOriginal = pins;
  }

  function onErrorDownload(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    window.setTimeout(function () {
      try {
        window.load.download(onSuccessDownload, onErrorDownload);
        window.filter.setFiltersActive();
      } catch (e) {
        onErrorDownload('Данные с сервера не загружены! Ошибка: ' + e.message);
      }
    }, 3000);
  }
  function onCloseSuccessUploadMessage() {
    main.removeChild(main.querySelector('.success'));
    window.main.setPageInactive();
    window.scrollTo(0, 0);
    successUploadMessage.removeEventListener('click', onCloseSuccessUploadMessage);
  }
  function onCloseFailUploadMessage() {
    main.removeChild(main.querySelector('.error'));
    successUploadMessage.removeEventListener('click', onCloseSuccessUploadMessage);
  }
  var successUploadMessage = document.querySelector('#success').content.querySelector('.success');
  var failUploadMessage = document.querySelector('#error').content.querySelector('.error');
  function onRetryUpload() {
    window.load.upload(new FormData(form), onSuccessUpload, onFailUpload);
    removeEventListener('click', onRetryUpload);
  }
  function onSuccessUpload() {
    main.insertBefore(successUploadMessage, mainDiv);
    successUploadMessage.addEventListener('click', onCloseSuccessUploadMessage);
  }
  function onFailUpload() {
    main.insertBefore(failUploadMessage, mainDiv);
    var errorButton = main.querySelector('.error__button');
    errorButton.addEventListener('click', onRetryUpload);
    failUploadMessage.addEventListener('click', onCloseFailUploadMessage);
  }
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.card.close();
    window.load.upload(new FormData(form), onSuccessUpload, onFailUpload);
  });
})();
