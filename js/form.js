'use strict';
// модуль, который работает с формой редактирования изображения;
(function () {
  var form = document.querySelector('#upload-select-image');
  var ESC_KEY = 'Escape';
  var DEFAULT_FILTER = 'none';
  var DEFAULT_FILTER_LEVEL = 100;

  var body = document.querySelector('body');
  // поле для загрузки изображения
  var inputLoad = document.querySelector('#upload-file');
  // находит кнопку для закрытия формы редактирования изображения
  var buttonClosePopup = document.querySelector('#upload-cancel');
  // находит кнопки для изменения изображения
  var uploadResizeInc = document.querySelector('.scale__control--bigger');
  var uploadResizeDec = document.querySelector('.scale__control--smaller');
  // Находит поле для ввода комментариев
  var textDescription = document.querySelector('.text__description');

  // Загрузка изображения и показ формы редактирования
  // закрывает форму с помощью клавиатуры, только если нажата нужная клавиша и фокус не в тегах
  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && window.filter.textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      closePopup();
    }
  };

  // открывает форму редактирования изображения
  var openPopup = function () {
    window.filter.uploadEffect.classList.remove('hidden');
    // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
    body.classList.add('modal-open');
    // позволяет закрыть форму с помощью клавиатуры
    document.addEventListener('keydown', onPopupEscPress);
    // меняет размер изображения
    uploadResizeInc.addEventListener('click', window.onResizeInc);
    uploadResizeDec.addEventListener('click', window.onResizeDec);
    // валидация хеш-тегов
    window.filter.textHashtags.addEventListener('change', window.filter.getValidityHashtags);
    // возвращает масштаб к 100%
    window.scale.uploadResizeField.value = DEFAULT_FILTER_LEVEL;
    // сбрасывает эффект на «Оригинал»
    window.filter.uploadImagePreview.style.filter = window.filter.filterCssFunction[DEFAULT_FILTER]();
    // скрывает ползунок
    window.filter.filterLevelArea.classList.toggle('hidden');
  };

  // открывает форму редактирования изображения после загрузки изображения
  var onInputLoadChange = function () {
    openPopup();
  };
  inputLoad.addEventListener('change', onInputLoadChange);

  // закрывает форму редактирования изображения
  var closePopup = function () {
    window.filter.uploadEffect.classList.add('hidden');
    body.classList.remove('modal-open');
    // сбрасывает значение поля выбора файла
    inputLoad.value = '';
    // снимает обработчик при закрытии формы
    document.removeEventListener('keydown', onPopupEscPress);
    // возвращает масштаб к 100%
    window.scale.uploadResizeField.value = DEFAULT_FILTER_LEVEL;
    // сбрасывает эффект на «Оригинал»
    window.filter.uploadImagePreview.style.filter = window.filter.filterCssFunction[DEFAULT_FILTER]();
    // очищает поля для ввода хэш-тегов и комментария
    window.filter.textHashtags.value = '';
    textDescription.value = '';
  };

  buttonClosePopup.addEventListener('click', closePopup);

  form.addEventListener('submit', function (evt) {
    // отменяет действие формы по умолчанию
    evt.preventDefault();
    // отправляет данные формы посредством XHR на сервер
    var data = new FormData(form);
    window.load.server(window.load.URL_SERVER, data, closePopup(), window.element.onError);
  });

  window.form = {
    DEFAULT_FILTER: DEFAULT_FILTER,
    DEFAULT_FILTER_LEVEL: DEFAULT_FILTER_LEVEL,
    body: body
  };
})();
