'use strict';
// модуль, который добавляет фильтрацию изображений
(function () {
  var RANDOM_PHOTO = 10;
  var filterButtons = document.querySelectorAll('.img-filters button');
  var filterActive;

  // отрисовывает изображения
  var showPhoto = function (data) {
    window.element.renderPhotosInDom(data);

    window.element.setPicturesHandlers(data);
  };

  // для фильтра 'Случайные' собирает массив из 'оставшихся' фотографий
  var getUnrepetitivePhoto = function (photos) {
    var images = [];
    for (var i = 0; i < RANDOM_PHOTO; i++) {
      var j = Math.floor(Math.random() * (photos.length - 1));

      images[i] = photos.splice(j, 1)[0];
    }

    return images;
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

      // при переключении фильтров оставляет блок загрузки изображения
      // и чистит блок picture для новых фотографий
      var pictures = document.querySelectorAll('.picture');
      pictures.forEach(function (it) {
        it.remove();
      });

      // создает копию массива
      var dataCopy = window.element.data.slice();

      if (target.textContent === 'Случайные') {
        // выводит 10 случайных, не повторяющихся фотографий
        dataCopy = getUnrepetitivePhoto(dataCopy);
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

