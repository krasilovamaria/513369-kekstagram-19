'use strict';
// модуль, который добавляет фильтрацию изображений
(function () {
  var RANDOM_PHOTO = 10;
  var filterButtons = document.querySelectorAll('.img-filters button');
  var filterActive;

  // отрисовывает изображения
  var showPhoto = function (data) {
    window.element.renderPhotosInDom(data);

    window.element.onMiniPicturesClick(data);
  };

  // для фильтра 'Случайные' собирает массив из 'оставшихся' фотографий
  var unrepetitivePhoto = function (photos) {
    var renewed = [];
    for (var i = 0; i < RANDOM_PHOTO; i++) {
      var randomCountPhoto = Math.floor(Math.random() * (photos.length - 1));

      renewed[i] = photos.splice(randomCountPhoto, 1)[0];
    }

    return renewed;
  };

  // обработчик изменения фильтров
  var onFilterClick = window.debounce(function (evt) {
    // находит фильтр на котором произошел клик
    var target = evt.target;

    // если это не фильтр на котором произошел клик
    if (!target.classList.contains('img-filters__button--active')) {
      filterActive = document.querySelector('.img-filters__button--active');
      // то удаляет, что это активный фильтр
      filterActive.classList.remove('img-filters__button--active');
      // и добавляет активный фильтр на котором произошел клик
      target.classList.add('img-filters__button--active');

      // убирает все фотографии отрисованные ранее
      window.element.pictures.innerHTML = '';

      // создает копию массива
      var dataCopy = window.element.data.slice();

      if (target.textContent === 'Случайные') {
        // выводит 10 случайных, не повторяющихся фотографий
        dataCopy = unrepetitivePhoto(dataCopy);
      } else if (target.textContent === 'Обсуждаемые') {
        // фотографии, отсортированные в порядке убывания количества комментариев
        dataCopy = dataCopy.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      }

      showPhoto(dataCopy);
    }
  });

  filterButtons.forEach(function (it) {
    it.addEventListener('click', onFilterClick);
  });
})();

