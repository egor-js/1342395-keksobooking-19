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
    }
  });
  form.capacity.addEventListener('input', function (evt) {
    form.room_number.setCustomValidity('');
    var target = evt.target;
    switch (target.value) {
      case '1':
        if (form.room_number.value === '100') {
          target.setCustomValidity(form.capacity.options[form.capacity.selectedIndex].textContent + ' слишком много комнат =)'); //  form.room_number.options[form.room_number.selectedIndex].textContent + ' не ' + form.capacity.options[form.capacity.selectedIndex].textContent)
        } else {
          target.setCustomValidity('');
        }
        break;
      case '2':
        if (form.room_number.value === '2' || form.room_number.value === '3') {
          target.setCustomValidity('');
        } else {
          target.setCustomValidity('Для 2 гостей нужно 2 или 3 комнаты'); // form.capacity.options[form.capacity.selectedIndex].textContent + ' нужно больше комнат'
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
    }
  });

})();
