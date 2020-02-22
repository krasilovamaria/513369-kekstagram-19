'use strict';
// модуль, который работает с элементами DOM
(function () {
  // шаблон template в документе
  var templatePicture = document.querySelector('#picture').content;

  // заполняет один элемент, принимает объект с данным параметром и возвращает готовый элемент
  var getPhotoElement = function (data) {
    // копирует template
    var photoItem = templatePicture.cloneNode(true);
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

  // находит блок для комментариев
  var socialComment = document.querySelector('.social__comment');

  // заполняет комментарий
  var getCommentElement = function (data) {
    var commentItemCopy = socialComment.cloneNode(true);

    // находит элементы, которые нужно заполнить
    var socialCommentImg = commentItemCopy.querySelector('img');
    var socialText = commentItemCopy.querySelector('.social__text');

    // заполняет фрагмент
    socialCommentImg.src = data.avatar;
    socialCommentImg.alt = data.name;
    socialText.textContent = data.message;

    return commentItemCopy;
  };

  var onSuccess = function (data) {
    renderPhotosInDom(data);

    // закрывает фотографию в полноразмерном режим
    window.picture.pictureClose.addEventListener('click', window.picture.onPictureCloseClick);

    // находит минитюру изображений, чтобы при клике показать большое изображение
    var miniPictures = document.querySelectorAll('a.picture');

    // открывает миниатюрные фотографии
    for (var i = 0; i < miniPictures.length; i++) {
      (function (element) {
        miniPictures[i].addEventListener('click', function () {
          // индекс из цикла по коллекции картинок
          window.picture.showBigPicture(element);
        });
      })(data[i]);
    }
  };

  var onError = function (message) {
    // шаблон ошибки в документе
    var errorTemplate = document.querySelector('#error').content;
    // клонирует шаблон
    var errorElement = errorTemplate.cloneNode(true);

    var errorTitle = errorElement.querySelector('.error__title');
    errorTitle.textContent = message;

    // добавляет ошибку в DOM
    var body = document.querySelector('body');
    body.appendChild(errorElement);
  };

  window.load.user(window.load.URL, onSuccess, onError);

  window.element = {
    getCommentElement: getCommentElement,
    socialComment: socialComment
  };
})();
