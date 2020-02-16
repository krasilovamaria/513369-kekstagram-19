'use strict';
// модуль для отрисовки увеличенного изображения;
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentTemplate = document.querySelector('.social__comments');
  // описание фотографии description
  var socialCaption = document.querySelector('.social__caption');
  // находит минитюру изображений, чтобы при клике показать большое изображение
  var miniPictures = document.querySelectorAll('a.picture');
  // находит кнопку для выхода из полноэкранного просмотра изображения
  var pictureClose = document.querySelector('#picture-cancel');

  var onPictureEscPress = function (evt) {
    if (evt.key === window.form.ESC_KEY) {
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
    // создает фрагмент, для вставки комменатриев
    var fragment = document.createDocumentFragment();
    // заполняет новые комментарии
    for (var i = 0; i < item.comments.length; i++) {
      fragment.appendChild(window.data.getCommentElement(item.comments[i]));
    }
    // чистит блок комментариев в разметке
    socialCommentTemplate.innerHTML = '';
    // добавляет новые комментарии
    socialCommentTemplate.appendChild(fragment);
    socialCaption.textContent = item.description;

    // скрывает блоки счётчика комментариев
    var socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

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
  pictureClose.addEventListener('click', onPictureCloseClick);
  function onPictureCloseClick() {
    closeBigPicture();
  }

  // массив с изображениями;
  var links = window.data.getArrayPhotos();

  // открывает миниатюрные фотографии
  for (var i = 0; i < miniPictures.length; i++) {
    (function (data) {
      miniPictures[i].addEventListener('click', function () {
        // индекс из цикла по коллекции картинок
        showBigPicture(data);
      });
    })(links[i]);
  }
})();