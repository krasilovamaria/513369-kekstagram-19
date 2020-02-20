'use strict';
// модуль для работы  взаимодействия с удалённым сервером через XHR
(function () {
  // запрос выполнен успешно
  var CODE_200 = 200;
  // ошибка клиента, неверный запрос
  var CODE_400 = 400;
  // ошибка клиента, не авторизован
  var CODE_401 = 401;
  // ошибка клиента, не найдено
  var CODE_404 = 404;
  // внутренняя ошибка сервера
  var CODE_500 = 500;
  // сервис недоступен
  var CODE_503 = 503;

  var onSuccess = function (data) {
    return data;
  };

  var onError = function (message) {
    return message;
  };

  window.load.user('https://htmlacademy.ru', onSuccess, onError);
  window.load.server('https://htmlacademy.ru', onSuccess, onError);

  window.load = {
    user: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case CODE_200:
            onSuccess(xhr.response);
            break;

          case CODE_400:
            onError('Неверный запрос');
            break;

          case CODE_401:
            onError('Пользователь не авторизован');
            break;

          case CODE_404:
            onError('Информация не найдена');
            break;

          default:
            onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.timeout = 10000; // 10s

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      // GET получает информацию от сервера
      xhr.open('GET', url);
      xhr.send();
    },

    server: function (url, data, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case CODE_500:
            onError('Внутренняя ошибка сервера');
            break;

          case CODE_503:
            onError('Сервер недоступен');
            break;

          default:
            onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.timeout = 10000; // 10s

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      // POST отправляет данные
      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
