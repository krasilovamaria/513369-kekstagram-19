'use strict';
// Данные для моки
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
var QUANTITY_MAX_OBJECT = 25;
var QUANTITY_MIN_COMMENT = 1;
var QUANTITY_MAX_COMMENT = 6;
var QUANTITY_MIN_LIKE = 15;
var QUANTITY_MAX_LIKE = 200;

// Функция генерации случайных чисел
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Функция, которая принимает массив в параметр и вернет его случайный элемент
function getRandomItem(items) {
  return items[getRandomArbitrary(0, items.length)];
}

// Создает comments
function getComments() {
  var comments = [];
  var countComments = getRandomArbitrary(QUANTITY_MIN_COMMENT, QUANTITY_MAX_COMMENT);

  for (var i = 0; i < countComments; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomArbitrary(QUANTITY_MIN_COMMENT, QUANTITY_MAX_COMMENT) + '.svg',
      message: getRandomItem(MESSAGES),
      name: getRandomItem(NAMES)
    };
  }

  return comments;
}

// Создает массив из сгенерированных JS объектов
function getArrayPhotos() {
  var photos = [];

  for (var i = 0; i < QUANTITY_MAX_OBJECT; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'description',
      likes: getRandomArbitrary(QUANTITY_MIN_LIKE, QUANTITY_MAX_LIKE),
      comments: getComments()
    };
  }

  return photos;
}

// Шаблон template в документе
var templatePicture = document.querySelector('#picture').content;

// Заполняет один элемент, принимает объект с данным параметром и возвращает готовый элемент
function getPhotoElement(data) {
  // Копирует template
  var photoItem = templatePicture.cloneNode(true);
  // Находит элементы, которые нужно заполнить
  var pictureImg = photoItem.querySelector('.picture__img');
  var pictureComments = photoItem.querySelector('.picture__comments');
  var pictureLikes = photoItem.querySelector('.picture__likes');
  // Заполняет шаблон
  pictureImg.src = data.url;
  pictureLikes.textContent = data.likes;
  pictureComments.textContent = data.comments.length;

  return photoItem;
}

// Отрисовывает сгенерированные DOM-элементы в блок .pictures
function renderPhotosInDom(photos) {
  // Находит контейнер для фотографий
  var pictures = document.querySelector('.pictures');
  // Создает фрагмент
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    // Добавляет моки в фрагмент
    fragment.appendChild(getPhotoElement(photos[i]));
  }

  // Добавляет фрагмент в блок pictures
  return pictures.appendChild(fragment);
}

renderPhotosInDom(getArrayPhotos());

// Находит блок для комментариев
var socialComments = document.querySelector('.social__comments');

// Заполняет комментарий
function getCommentElement(data) {
  var socialComment = document.querySelector('.social__comment');
  var commentItem = socialComment.cloneNode(true);
  // Находит элементы, которые нужно заполнить
  var socialCommentImg = socialComment.querySelector('img');
  var socialText = socialComment.querySelector('.social__text');
  // Заполняет фрагмент
  socialCommentImg.src = data.avatar;
  socialCommentImg.alt = data.name;
  socialText.textContent = data.message;

  return commentItem;
}

// Находит элемент big-picture

var bigPicture = document.querySelector('.big-picture');
// Показывает фотографию в полноразмерном режиме
function showBigPicture(item) {
  // Удаляет класс hidden
  bigPicture.classList.remove('hidden');
  // Находит элементы, которые нужно заполнить
  var bigPictureImg = bigPicture.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  // Заполняет фрагмент
  bigPictureImg.src = item.url;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  // Создает фрагмент
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < item.comments.length; i++) {
    fragment.appendChild(getCommentElement(item.comments[i]));
    // Чистит блок комментариев
    socialComments.removeChild(socialComments.firstChild); // что я пишу неправильно, что существующие в разметке комменты не удаляются??
    // Добавляет комментарии
    socialComments.appendChild(fragment);
  }

  // Описание фотографии description
  var socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = item.description;

  // Cкрывает блоки счётчика комментариев
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  // Добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  var body = document.querySelector('body');
  body.classList.add('modal-open');

  return item;
}

showBigPicture(getArrayPhotos()[0]);

