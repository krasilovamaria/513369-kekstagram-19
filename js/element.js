'use strict';
// модуль, который работает с элементами DOM
(function () {
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
  var QUANTITY_MAX_OBJECT = 25;
  var QUANTITY_MIN_COMMENT = 1;
  var QUANTITY_MAX_COMMENT = 6;
  var QUANTITY_MIN_LIKE = 15;
  var QUANTITY_MAX_LIKE = 200;
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

  renderPhotosInDom(window.data.getArrayPhotos());

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

  window.element = {
    MESSAGES: MESSAGES,
    NAMES: NAMES,
    QUANTITY_MAX_OBJECT: QUANTITY_MAX_OBJECT,
    QUANTITY_MIN_COMMENT: QUANTITY_MIN_COMMENT,
    QUANTITY_MAX_COMMENT: QUANTITY_MAX_COMMENT,
    QUANTITY_MIN_LIKE: QUANTITY_MIN_LIKE,
    QUANTITY_MAX_LIKE: QUANTITY_MAX_LIKE,
    templatePicture: templatePicture,
    getCommentElement: getCommentElement,
    socialComment: socialComment
  };
})();
