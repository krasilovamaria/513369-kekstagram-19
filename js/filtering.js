'use strict';
// модуль, который добавляет фильтрацию изображений
(function () {
  // 10 случайных фотографий
  var RANDOM_PHOTO = 10;

  var filterButton = document.querySelector('.img-filters__button');
  var filterButtonActive = document.querySelector('.img-filters__button--active');
  // ссылка на элемент, которая обновляется при смене активного фильтра
  var filterActive;

  // обработчик изменения фильтров
  var onFilterClick = function (evt) {
    // находит фильтр на котором произошел клик
    var target = evt.target;

    // убирает все фотографии отрисованные ранее
    window.element.pictures.innerHTML = '';

    // если это не фильтр на котором произошел клик
    if (!target.classList.containes('.img-filters__button--active')) {
      // то удаляет, что это активный фильтр
      filterActive.classList.remove('img-filters__button--active');
      // и добавляет активный фильтр на котором произошел клик
      target.classList.add('img-filters__button--active');
      // создает копию массива
      var dataCopy = window.element.data.slice();
    }
  };

  // По умолчанию — фотографии в изначальном порядке с сервера
  // Случайные — 10 случайных, не повторяющихся фотографий
  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев


})();

