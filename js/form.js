'use strict';
// модуль, который работает с формой редактирования изображения;
(function () {
  var MAX_BLUR = 3;
  var MIN_HEAT = 1;
  var MAX_HEAT = 3;
  var QUANTITY_MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var uploadEffect = document.querySelector('.img-upload__overlay');
  var textHashtags = document.querySelector('.text__hashtags');
  var uploadImagePreview = document.querySelector('.img-upload__preview');
  var filterLevelArea = document.querySelector('.img-upload__effect-level');
  var filterUploadLevelValue = document.querySelector('.effect-level__value');
  var currentFilter = window.DEFAULT_FILTER;

  // собирает функции для формирования css строки фильтра в справочник
  var filterCssFunction = {
    'none': function () {
      return '';
    },
    'chrome': function (level) {
      return 'grayscale(' + level / 100 + ')';
    },
    'sepia': function (level) {
      return 'sepia(' + level / 100 + ')';
    },
    'marvin': function (level) {
      return 'invert(' + level + '%)';
    },
    'phobos': function (level) {
      return 'blur(' + level / 100 * MAX_BLUR + 'px)';
    },
    'heat': function (level) {
      return 'brightness(' + (level / 100 * (MAX_HEAT - MIN_HEAT) + MIN_HEAT) + ')';
    }
  };

  window.form = {
    uploadEffect: uploadEffect,
    uploadImagePreview: uploadImagePreview,
    textHashtags: textHashtags,
    filterCssFunction: filterCssFunction
  };

  var setFilterLevel = function (level) {
    var effect = filterCssFunction[currentFilter](level);
    // toFixed() форматирует число, используя запись с фиксированной запятой
    filterUploadLevelValue.value = level.toFixed();
    uploadImagePreview.style.filter = effect;
  };

  var setDefaultLevel = function () {
    setFilterLevel(window.gallery.DEFAULT_FILTER_LEVEL);
  };

  var setFilterForUploadImage = function (filterName) {
    filterLevelArea.classList.toggle('hidden', filterName === window.DEFAULT_FILTER);

    currentFilter = filterName;
    setDefaultLevel();
  };

  uploadEffect.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      var filterName = evt.target.value;
      setFilterForUploadImage(filterName);
    }
  });

  // !! Валидация хеш-тегов !!
  // валидация хеш-тегов
  window.getValidityHashtags = function () {
    textHashtags.setCustomValidity(''); // сбросим при изменении, найдем ошибку - поставим
    // находит значения из input
    var inputHashtags = textHashtags.value;
    if (inputHashtags === '') {
      // хэш-теги необязательны;
      return;
    }
    // набор хэш-тегов из input превращает в массив
    var arrayHashtags = inputHashtags.toLowerCase().split(' ');
    if (arrayHashtags.length >= QUANTITY_MAX_HASHTAGS) {
      textHashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
      // дальше не будем проверять отдельные теги
      return;
    }
    // объект для проверки тегов на уникальность, записывает встреченные теги
    var uniqTag = {};
    // цикл, который ходит по полученному массиву и проверяет каждый из хэш-тегов на предмет соответствия ограничениям
    for (var i = 0; i < arrayHashtags.length; i++) {
      if (!arrayHashtags[i].match(/^#[a-zA-Z0-9а-яА-Я]+$/)) {
        textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка) и должен состоять только из букв и чисел');
        break;
      }
      if (arrayHashtags[i].length > MAX_LENGTH_HASHTAG) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега должна быть не больше 20 символов, включая решётку');
        break;
      }
      if (uniqTag[arrayHashtags[i]]) {
        textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        break;
      }
      // если все в порядке, записывает тег в список уникальных
      uniqTag[arrayHashtags[i]] = true;
    }
  };
})();
