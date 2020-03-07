'use strict';
// модуль для редактирования размера изображения;
(function () {
  // Редактирование размера изображения
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;
  var VALUE_SCALE = 100;
  // 10 - основание системы счисления числовой строки
  var NUMBER_BASE = 10;
  // находит кнопки для изменения изображения
  var uploadResizeField = document.querySelector('.scale__control--value');
  // находит изображение для трансформации
  var uploadImagePreviewForScale = document.querySelector('.img-upload__preview img');

  // возвращает целое число
  var getScaleValue = function () {
  // parseInt() принимает строку в качестве аргумента и возвращает целое число
    return parseInt(uploadResizeField.value, NUMBER_BASE);
  };

  // переводит в проценты
  var setScaleValue = function (value) {
    uploadResizeField.value = value + '%';
  };

  // диапазон
  var getScaleValueInRange = function (value) {
    return Math.min(UPLOAD_RESIZE_MAX, Math.max(UPLOAD_RESIZE_MIN, value));
  };

  // создает свойство css для транформации изображения
  var setScaleForUploadImage = function (scale) {
    uploadImagePreviewForScale.style.transform = 'scale(' + (scale / VALUE_SCALE) + ')';
  };

  // трансформирует изображение
  var changeScale = function (step) {
    var currentScaleValue = getScaleValue();
    var newScaleValue = getScaleValueInRange(currentScaleValue + step);

    setScaleValue(newScaleValue);
    setScaleForUploadImage(newScaleValue);
  };

  window.onResizeInc = function () {
    changeScale(UPLOAD_RESIZE_STEP);
  };

  window.onResizeDec = function () {
    changeScale(-UPLOAD_RESIZE_STEP);
  };

  window.scale = {
    uploadResizeField: uploadResizeField
  };
})();
