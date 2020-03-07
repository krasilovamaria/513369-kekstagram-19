'use strict';
// модуль, для изменения эффекта изображения и валидации хеш-тегов
(function () {
  var MAX_BLUR = 3;
  var MIN_HEAT = 1;
  var MAX_HEAT = 3;
  var QUANTITY_MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var EFFECT_VALUE = 100;
  var uploadEffect = document.querySelector('.img-upload__overlay');
  var textHashtags = uploadEffect.querySelector('.text__hashtags');
  var uploadImagePreview = uploadEffect.querySelector('.img-upload__preview');

  // слайдер, задающий глубину эффекта
  var filterLevelArea = uploadEffect.querySelector('.img-upload__effect-level');
  var filterUploadLevelValue = filterLevelArea.querySelector('.effect-level__value');
  var filterLevelBar = filterLevelArea.querySelector('.effect-level__line');
  var filterLevelPin = filterLevelBar.querySelector('.effect-level__pin');
  var filterLevelValue = filterLevelBar.querySelector('.effect-level__depth');
  var currentFilter = window.form.DEFAULT_FILTER;

  // собирает функции для формирования css строки фильтра в справочник
  var filterCssFunction = {
    'none': function () {
      return '';
    },
    'chrome': function (level) {
      return 'grayscale(' + level / EFFECT_VALUE + ')';
    },
    'sepia': function (level) {
      return 'sepia(' + level / EFFECT_VALUE + ')';
    },
    'marvin': function (level) {
      return 'invert(' + level + '%)';
    },
    'phobos': function (level) {
      return 'blur(' + level / EFFECT_VALUE * MAX_BLUR + 'px)';
    },
    'heat': function (level) {
      return 'brightness(' + (level / EFFECT_VALUE * (MAX_HEAT - MIN_HEAT) + MIN_HEAT) + ')';
    }
  };

  var setFilterLevel = function (level) {
    var effect = filterCssFunction[currentFilter](level);
    // toFixed() форматирует число, используя запись с фиксированной запятой
    filterUploadLevelValue.value = level.toFixed();
    uploadImagePreview.style.filter = effect;
  };

  var setFilterForUploadImage = function (filterName) {
    filterLevelArea.classList.toggle('hidden', filterName === window.form.DEFAULT_FILTER);

    currentFilter = filterName;
    setDefaultLevel();
  };

  uploadEffect.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      var filterName = evt.target.value;
      setFilterForUploadImage(filterName);
    }
  });

  var setDefaultLevel = function () {
    setFilterLevel(window.form.DEFAULT_FILTER_LEVEL);
    setFilterPinPosition(window.form.DEFAULT_FILTER_LEVEL);
  };

  // находит смещение пина
  var getPinOffsetOfInPercent = function (value) {
    // offsetWidth ширина элемента
    var valueInRange = Math.min(filterLevelBar.offsetWidth, Math.max(0, value));
    return valueInRange * EFFECT_VALUE / filterLevelBar.offsetWidth;
  };

  // находит позицию пина в процентах
  var setFilterPinPosition = function (position) {
    filterLevelPin.style.left = position + '%';
    filterLevelValue.style.width = position + '%';
  };

  filterLevelPin.addEventListener('mousedown', function (evt) {
    // clientX числовое значение горизонтальной координаты
    var startPosition = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // offsetLeft возвращает смещение в пикселях верхнего левого угла текущего элемента от родительского
      var shift = startPosition - moveEvt.clientX;
      var newPosition = filterLevelPin.offsetLeft - shift;
      var newOffset = getPinOffsetOfInPercent(newPosition);
      setFilterPinPosition(newOffset);
      setFilterLevel(newOffset);
      startPosition = moveEvt.clientX;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // !! Валидация хеш-тегов !!
  // валидация хеш-тегов
  var getValidityHashtags = function () {
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

  window.filter = {
    uploadEffect: uploadEffect,
    uploadImagePreview: uploadImagePreview,
    textHashtags: textHashtags,
    filterCssFunction: filterCssFunction,
    getValidityHashtags: getValidityHashtags,
    filterLevelArea: filterLevelArea
  };
})();
