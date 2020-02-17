'use strict';
// модуль, который создаёт данные для моки;
(function () {
  // функция генерации случайных чисел
  var getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // функция, которая принимает массив в параметр и вернет его случайный элемент
  var getRandomItem = function (items) {
    return items[getRandomArbitrary(0, items.length)];
  };

  // создает comments
  var getComments = function () {
    var comments = [];
    var countComments = getRandomArbitrary(window.element.QUANTITY_MIN_COMMENT, window.element.QUANTITY_MAX_COMMENT);
    for (var i = 0; i < countComments; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + getRandomArbitrary(window.element.QUANTITY_MIN_COMMENT, window.element.QUANTITY_MAX_COMMENT) + '.svg',
        message: getRandomItem(window.element.MESSAGES),
        name: getRandomItem(window.element.NAMES)
      };
    }

    return comments;
  };

  // создает массив из сгенерированных JS объектов
  var getArrayPhotos = function () {
    var photos = [];

    for (var i = 0; i < window.element.QUANTITY_MAX_OBJECT; i++) {
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'description',
        likes: getRandomArbitrary(window.element.QUANTITY_MIN_LIKE, window.element.QUANTITY_MAX_LIKE),
        comments: getComments()
      };
    }

    return photos;
  };

  // заполняет один элемент, принимает объект с данным параметром и возвращает готовый элемент
  var getPhotoElement = function (data) {
  // копирует template
    var photoItem = window.element.templatePicture.cloneNode(true);
    // находит элементы, которые нужно заполнить
    var pictureImg = photoItem.querySelector('.picture__img');
    var pictureComments = photoItem.querySelector('.picture__comments');
    var pictureLikes = photoItem.querySelector('.picture__likes');
    // заполняет шаблон
    pictureImg.src = data.url;
    pictureLikes.textContent = data.likes;
    pictureComments.textContent = data.comments.length;

    return photoItem;
  };

  // отрисовывает сгенерированные DOM-элементы в блок .pictures
  var renderPhotosInDom = function (photos) {
  // находит контейнер для фотографий
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
    // добавляет моки в фрагмент
      fragment.appendChild(getPhotoElement(photos[i]));
    }

    // добавляет фрагмент в блок pictures
    return pictures.appendChild(fragment);
  };

  renderPhotosInDom(getArrayPhotos());

  // заполняет комментарий
  var getCommentElement = function (data) {
    var commentItemCopy = window.element.socialComment.cloneNode(true);
    // находит элементы, которые нужно заполнить
    var socialCommentImg = commentItemCopy.querySelector('img');
    var socialText = commentItemCopy.querySelector('.social__text');
    // заполняет фрагмент
    socialCommentImg.src = data.avatar;
    socialCommentImg.alt = data.name;
    socialText.textContent = data.message;

    return commentItemCopy;
  };

  window.data = {
    getArrayPhotos: getArrayPhotos,
    getCommentElement: getCommentElement,
  };
})();
