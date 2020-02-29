'use strict';
// модуль, который работает с элементами DOM
(function () {
  // шаблон template в документе
  var templatePicture = document.querySelector('#picture').content;

  // находит блок для комментариев
  var socialComment = document.querySelector('.social__comment');

  // находит контейнер для фотографий
  var pictures = document.querySelector('.pictures');

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
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      // добавляет моки в фрагмент
      fragment.appendChild(getPhotoElement(photos[i]));
    }

    // добавляет фрагмент в блок pictures
    return pictures.appendChild(fragment);
  };

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

    // после завершения загрузки изображений с сервера показывает фильтры изображений
    var filterSection = document.querySelector('.img-filters');
    filterSection.classList.remove('img-filters--inactive');

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

  // показывает сообщение об ошибке и позволяет его закрыть
  var onError = function (message) {
    window.form.completeTemplate('#error', '.error__title', '.error__button', message);
  };

  window.load.user(window.load.URL, onSuccess, onError);

  window.element = {
    getCommentElement: getCommentElement,
    socialComment: socialComment,
    onError: onError,
    renderPhotosInDom: renderPhotosInDom,
    pictures: pictures
  };
})();
