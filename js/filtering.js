'use strict';
// модуль, который добавляет фильтрацию изображений
(function () {
  var filterButtons = document.querySelectorAll('.img-filters button');
  var filterActive;

  // отрисовывает изображения
  // ??? НЕ ЗНАЮ ЧТО ЗДЕСЬ ПИСАТЬ ???
  var showPhoto = function (data) {
    window.element.renderPhotosInDom(data);

    window.filtering.data = data;
  };

  // для фильтра 'Случайные' собирает массив из 'оставшихся' фотографий
  var unrepetitivePhoto = function (array) {
    for (var i = 0; i < array.length; i++) {
      var randomCountPhoto = Math.floor(Math.random() * (array.length - 1));
      array[i] = array[randomCountPhoto];
    }

    return array;
  };

  // обработчик изменения фильтров
  var onFilterClick = function (evt) {
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
      var dataCopy = window.filtering.data.slice();

      window.debounce(function () {
        if (target.textContent === 'Случайные') {
          // выводит 10 случайных, не повторяющихся фотографий
          // 11 - 'каждый элемент с 11 будет удален'
          dataCopy = unrepetitivePhoto(dataCopy).splice(11);
        } else if (target.textContent === 'Обсуждаемые') {
          // фотографии, отсортированные в порядке убывания количества комментариев
          dataCopy = dataCopy.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        }

        showPhoto(dataCopy);
      });
    }
  };

  filterButtons.forEach(function (it) {
    it.addEventListener('click', onFilterClick);
  });
})();

