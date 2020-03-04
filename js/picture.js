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

    var getCommentWithStep = function (comments) {
      // создает фрагмент, для вставки комменатриев
      var fragment = document.createDocumentFragment();
      // заполняет новые комментарии
      for (var i = 0; i < item.comments.length; i++) {
        fragment.appendChild(window.element.getCommentElement(item.comments[i]));
      }

      var commentCollection;
      if (item.comments.length > count) {
        count += COMMENT_STEP;
        commentCollection = comments.slice(0, COMMENT_STEP);
      }
      commentCollection = comments;

      return commentCollection;
    };

    // чистит блок комментариев в разметке
    socialCommentTemplate.innerHTML = '';
    // добавляет новые комментарии
    socialCommentTemplate.appendChild(fragment);
    socialCaption.textContent = item.description;

    // блоки счётчика комментариев
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');

    commentsLoader.addEventListener('click', getCommentWithStep);

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
