'use strict';
// модуль для отрисовки увеличенного изображения;
(function () {
  var ESC_KEY = 'Escape';
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentTemplate = document.querySelector('.social__comments');
  // описание фотографии description
  var socialCaption = document.querySelector('.social__caption');
  // находит кнопку для выхода из полноэкранного просмотра изображения
  var pictureClose = document.querySelector('#picture-cancel');
  var COMMENT_STEP = 5;
  var count = 0;

  var onPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  // создает фрагмент, для вставки комменатриев
  var crateFragmentComments = function (comments) {
    // создает фрагмент, для вставки комменатриев
    var fragment = document.createDocumentFragment();

    // заполняет новые комментарии
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(window.element.getCommentElement(comments[i]));
    }

    return socialCommentTemplate.appendChild(fragment);
  };

  // показывает только 'нужные' комментарии
  var getCommentWithStep = function (comments) {
    var commentsCollection;
    if (comments.length > count) {
      commentsCollection = comments.slice(0, COMMENT_STEP + count);
    }
    commentsCollection = comments;

    return crateFragmentComments(commentsCollection);
  };

  // показывает фотографию в полноразмерном режиме
  var showBigPicture = function (item) {
  // находит элементы, которые нужно заполнить
    var bigPictureImg = bigPicture.querySelector('img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    // заполняет фрагмент
    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    socialCaption.textContent = item.description;

    // чистит блок комментариев в разметке
    socialCommentTemplate.innerHTML = '';

    // блоки счётчика комментариев
    var commentsLoader = document.querySelector('.comments-loader');

    // загружает еще комментарии
    commentsLoader.addEventListener('click', getCommentWithStep(???НЕ МОГУ ПОНЯТЬ ЧТО СЮДА ПЕРЕДАТЬ));

    // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
    window.form.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    // закрывает фотографию с клавиатуры
    document.addEventListener('keydown', onPictureEscPress);

    return item;
  };

  var closeBigPicture = function () {
  // снимает обработчик с формы
    document.removeEventListener('keydown', onPictureEscPress);
    bigPicture.classList.add('hidden');
    window.form.body.classList.remove('modal-open');
  };

  // закрывает фотографию в полноразмерном режим
  var onPictureCloseClick = function () {
    closeBigPicture();
  };
  pictureClose.addEventListener('click', onPictureCloseClick);

  window.picture = {
    showBigPicture: showBigPicture,
    onPictureCloseClick: onPictureCloseClick,
    pictureClose: pictureClose
  };
})();
