'use strict';
// модуль для отрисовки увеличенного изображения;
(function () {
  var ESC_KEY = 'Escape';
  var bigPicture = document.querySelector('.big-picture');
  var socialCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = socialCount.querySelector('.comments-count');
  var socialCommentTemplate = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');
  // находит кнопку для выхода из полноэкранного просмотра изображения
  var pictureClose = bigPicture.querySelector('#picture-cancel');
  // кнопка 'загрузить еще'
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var COMMENT_STEP = 5;
  var count = 0;

  var onPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  // создает фрагмент, для вставки комменатриев
  var createFragmentComments = function (comments) {
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
    var commentsCollection = comments.slice(count, COMMENT_STEP + count);
    count += COMMENT_STEP;
    createFragmentComments(commentsCollection);
    commentsLoader.classList.toggle('hidden', comments.length <= count);
    socialCount.firstChild.textContent = Math.min(count, comments.length) + ' из ';
    commentsCount.textContent = comments.length;
  };

  // показывает фотографию в полноразмерном режиме
  var showBigPicture = function (item) {
  // находит элементы, которые нужно заполнить
    var bigPictureImg = bigPicture.querySelector('img');
    var likesCount = bigPicture.querySelector('.likes-count');

    // заполняет фрагмент
    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    socialCaption.textContent = item.description;

    // чистит блок комментариев в разметке
    socialCommentTemplate.innerHTML = '';

    // показывает 'начальные' комментарии
    count = 0;
    getCommentWithStep(item.comments);

    // обработчик для кнопки 'загрузить еще'
    window.picture.onCommentsLoaderClick = function () {
      getCommentWithStep(item.comments);
    };

    // загружает еще комментарии
    commentsLoader.addEventListener('click', window.picture.onCommentsLoaderClick);

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
    commentsLoader.removeEventListener('click', window.picture.onCommentsLoaderClick);
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
