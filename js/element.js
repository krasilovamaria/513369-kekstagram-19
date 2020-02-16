'use strict';
// модуль, который работает с элементами DOM
(function () {
  // заполняет один элемент, принимает объект с данным параметром и возвращает готовый элемент
  var getPhotoElement = function (data) {
    // копирует template
    var photoItem = window.data.templatePicture.cloneNode(true);
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

  renderPhotosInDom(window.getArrayPhotos());

  // заполняет комментарий
  window.getCommentElement = function (data) {
    var commentItemCopy = window.data.socialComment.cloneNode(true);
    // находит элементы, которые нужно заполнить
    var socialCommentImg = commentItemCopy.querySelector('img');
    var socialText = commentItemCopy.querySelector('.social__text');
    // заполняет фрагмент
    socialCommentImg.src = data.avatar;
    socialCommentImg.alt = data.name;
    socialText.textContent = data.message;

    return commentItemCopy;
  };
})();
