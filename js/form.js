'use strict';

(function () {
  var form = document.querySelector('form.ad-form');
  form.timein.addEventListener('input', function (evt) {
    var target = evt.target;
    form.timeout.value = target.value;
  });
  form.timeout.addEventListener('input', function (evt) {
    var target = evt.target;
    form.timein.value = target.value;
  });
  form.room_number.addEventListener('input', function (evt) {
    form.capacity.setCustomValidity('');
    var target = evt.target;
    switch (target.value) {
      case '1':
        if (form.capacity.value !== '1') {
          target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '2':
        if (form.capacity.value === '2' || form.capacity.value === '1') {
          target.setCustomValidity('');
        } else {
          target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
        }
        break;
      case '3':
        if (form.capacity.value === '0') {
          target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '100':
        if (form.capacity.value !== '0') {
          target.setCustomValidity('100 комнат не для гостей');
        } else {
          target.setCustomValidity('');
        }
        break;
      default:
        console.error('Unknown case in select "rooms"');
    }
  });

  form.capacity.addEventListener('input', function (evt) {
    form.room_number.setCustomValidity('');
    var target = evt.target;
    switch (target.value) {
      case '1':
        if (form.room_number.value === '100') {
          target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' слишком много комнат =)');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '2':
        if (form.room_number.value === '2' || form.room_number.value === '3') {
          target.setCustomValidity('');
        } else {
          target.setCustomValidity('Для 2 гостей нужно 2 или 3 комнаты');
        }
        break;
      case '3':
        if (form.room_number.value !== '3') {
          target.setCustomValidity('Для 3 гостей нужно 3 комнаты');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '0':
        if (form.room_number.value !== '100') {
          target.setCustomValidity('не для гостей нужно 100 комнат');
        } else {
          target.setCustomValidity('');
        }
        break;
      default:
        console.error('Unknown case in select "capacity"');
    }
  });
})();

(function () {
  var form = document.querySelector('form.ad-form');
  form.price.setAttribute('placeholder', '1000');
  form.title.setAttribute('maxlength', '100');
  form.title.setAttribute('minlength', '30');
  form.title.setAttribute('required', '');
  form.price.setAttribute('required', '');
  form.price.setAttribute('max', '1000000');
  form.price.setAttribute('min', '1000');
  form.capacity.selectedIndex = 2;
  form.avatar.setAttribute('accept', 'image/png, image/jpg, image/jpeg');
  form.images.setAttribute('accept', 'image/png, image/jpg, image/jpeg');
  form.type.addEventListener('input', function (evt) {
    var target = evt.target;
    switch (target.value) {
      case 'bungalo':
        form.price.setAttribute('min', '0');
        form.price.setAttribute('placeholder', '0');
        break;
      case 'flat':
        form.price.setAttribute('min', '1000');
        form.price.setAttribute('placeholder', '1000');
        break;
      case 'house':
        form.price.setAttribute('min', '5000');
        form.price.setAttribute('placeholder', '5000');
        break;
      case 'palace':
        form.price.setAttribute('min', '10000');
        form.price.setAttribute('placeholder', '10000');
        break;
      default:
        console.error('Unknown case in select "type"');
    }
  });
  window.form = {
    setFormActive: function () {
      for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].removeAttribute('disabled', '');
      }
    },
    setFormInactive: function () {
      for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].setAttribute('disabled', '');
      }
    }
  };
})();
