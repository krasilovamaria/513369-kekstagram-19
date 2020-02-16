'use strict';
// модуль для отрисовки увеличенного изображения;
(function () {
  // Редактирование размера изображения
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;
  // находит кнопки для изменения изображения
  var uploadResizeField = document.querySelector('.scale__control--value');
  // находит изображение для трансформации
  var uploadImagePreviewForScale = document.querySelector('.img-upload__preview img');

  window.preview = {
    uploadResizeField: uploadResizeField
  };

  // возвращает целое число
  var getScaleValue = function () {
  // parseInt() принимает строку в качестве аргумента и возвращает целое число
  // 10 - основание системы счисления числовой строки
    return parseInt(uploadResizeField.value, 10);
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
    uploadImagePreviewForScale.style.transform = 'scale(' + (scale / 100) + ')';
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
})();
