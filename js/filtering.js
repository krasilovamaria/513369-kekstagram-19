'use strict';
// модуль, который добавляет фильтрацию изображений
(function () {
  var RANDOM_PHOTO = 10;

  var filterButton = document.querySelector('.img-filters__button');
  var filterActive;

  // обработчик изменения фильтров
  var onFilterClick = function (evt) {
    // находит фильтр на котором произошел клик
    var target = evt.target;

    // если это не фильтр на котором произошел клик
    if (!target.classList.containes('img-filters__button--active')) {
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
        dataCopy = dataCopy.slice(0, RANDOM_PHOTO);
        // взять копию массива с данными и в цикле вызвать для нее splice
        // на случайном элементе - он удаляет элемент из массива и второй раз элемент в выборку уже не попадет
      } else if (target.textContent === 'Обсуждаемые') {
        // фотографии, отсортированные в порядке убывания количества комментариев
        dataCopy = dataCopy.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      }

      window.element.onSuccess(dataCopy);
    }
  };

  // тут еще нужен debounce
  filterButton.addEventListener('click', onFilterClick);
})();

