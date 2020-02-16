'use strict';
// модуль, который работает с галереей изображений; Использует вспомогательные модули
(function () {
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

  window.gallery = {
    DEFAULT_FILTER_LEVEL: DEFAULT_FILTER_LEVEL,
    body: body
  };

  // Загрузка изображения и показ формы редактирования
  // закрывает форму с помощью клавиатуры, только если нажата нужная клавиша и фокус не в тегах
  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && window.form.textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      closePopup();
    }
  };

  // открывает форму редактирования изображения
  var openPopup = function () {
    window.form.uploadEffect.classList.remove('hidden');
    // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
    body.classList.add('modal-open');
    // позволяет закрыть форму с помощью клавиатуры
    document.addEventListener('keydown', onPopupEscPress);
    // меняет размер изображения
    uploadResizeInc.addEventListener('click', window.onResizeInc);
    uploadResizeDec.addEventListener('click', window.onResizeDec);
    // валидация хеш-тегов
    window.form.textHashtags.addEventListener('change', window.getValidityHashtags);
  };

  // открывает форму редактирования изображения после загрузки изображения
  inputLoad.addEventListener('change', onInputLoadChange);
  function onInputLoadChange() {
    openPopup();
  }

  // закрывает форму редактирования изображения
  var closePopup = function () {
    window.form.uploadEffect.classList.add('hidden');
    body.classList.remove('modal-open');
    // сбрасывает значение поля выбора файла
    inputLoad.value = '';
    // снимает обработчик при закрытии формы
    document.removeEventListener('keydown', onPopupEscPress);
    // возвращает масштаб к 100%
    window.preview.uploadResizeField.value = DEFAULT_FILTER_LEVEL;
    // сбрасывает эффект на «Оригинал»
    window.form.uploadImagePreview.style.filter = window.form.filterCssFunction[DEFAULT_FILTER]();
    // очищает поля для ввода хэш-тегов и комментария
    window.form.textHashtags.value = '';
    textDescription.value = '';
  };

  buttonClosePopup.addEventListener('click', closePopup);
})();
