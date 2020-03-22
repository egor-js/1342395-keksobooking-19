'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 500;
  window.uploadSuccess = false;
  window.downloadSuccess = false;
  window.load = {
    download: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
          window.downloadSuccess = true;
        } else {
          onError('Статус ответа GET: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения GET');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос GET не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_GET);
      try {
        xhr.send();
      } catch (e) {
        onError('При отправке запроса GET возникла ошибка ' + e);
      }
    },
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        console.log('xhr.status ' + xhr.status);
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
          onError('Статус ответа POST: ' + xhr.status + ' ' + xhr.statusText);
          window.uploadSuccess = true;
        } else {
          onError('Статус ответа POST: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения POST');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос POST не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', URL_POST);
      try {
        xhr.send(data);
      } catch (e) {
        console.log(e);
        onError('При отправке запроса POST возникла ошибка ' + e);
      }
    }
  };
})();
