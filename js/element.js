'use strict';
// модуль, который работает с элементами DOM
(function () {
  // шаблон template в документе
  var templatePicture = document.querySelector('#picture').content;

  // находит контейнер для фотографий
  var pictures = document.querySelector('.pictures');

  var main = document.querySelector('main');

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

  // обработчик закрытия окна ошибки c помощью клавиатуры
  var onEscapePress = function (evt) {
    if (evt.key === window.form.ESC_KEY) {
      closeWindow(); // ?? КАК МНЕ СЮДА ТЕПЕРЬ ПЕРЕДАТЬ .error, а в form.js в onUploadSuccess() .success ??
    }
  };

  // обработчик закрытия окна ошибки c помощью клавиатуры по клику на произвольную область экрана
  var onButtonCloseClick = function () {
    closeWindow(); // ?? КАК МНЕ СЮДА ТЕПЕРЬ ПЕРЕДАТЬ .error, а в form.js в onUploadSuccess() .success ??
  };

  // удаляет окно из main
  var closeWindow = function (element) {
    document.querySelector(element).remove();

    // снимает дополнительные обработчики
    document.removeEventListener('keydown', onEscapePress);
    document.removeEventListener('click', onButtonCloseClick);
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

  var onError = function (message) {
    // шаблон ошибки в документе
    var errorTemplate = document.querySelector('#error').content;
    // клонирует шаблон
    var errorElement = errorTemplate.cloneNode(true);

    // добавляет сообщение об ошибке
    var errorTitle = errorElement.querySelector('.error__title');
    errorTitle.textContent = message;

    // закрывает окно ошибки c помощью кнопки
    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      closeWindow('.error');
    });

    // закрывает окно ошибки c помощью клавиатуры
    document.addEventListener('keydown', onEscapePress);

    // закрывает окно ошибки c помощью клавиатуры по клику на произвольную область экрана
    document.addEventListener('click', onButtonCloseClick);

    // добавляет ошибку в DOM
    main.appendChild(errorElement);
  };

  window.load.user(window.load.URL, onSuccess, onError);

  window.element = {
    getCommentElement: getCommentElement,
    socialComment: socialComment,
    onError: onError,
    onEscapePress: onEscapePress,
    onButtonCloseClick: onButtonCloseClick,
    closeWindow: closeWindow,
    renderPhotosInDom: renderPhotosInDom,
    onSuccess: onSuccess,
    pictures: pictures
  };
})();
