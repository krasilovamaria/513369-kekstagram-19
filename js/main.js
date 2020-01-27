'use strict';
// Данные для моки
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
var QUANTITY_MIN_OBJECT = 1;
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
function getRandomNumber(arrays) {
  var number = arrays[getRandomArbitrary(arrays.length)];

  return number;
}

// Создает comments
function getComments() {
  var comments = [];

  for (var i = 0; i < QUANTITY_MAX_COMMENT; i++) {
    comments[i] = {
      avatar: 'img/avatar' + getRandomArbitrary(QUANTITY_MIN_COMMENT, QUANTITY_MAX_COMMENT) + '.svg',
      message: getRandomNumber(MESSAGES),
      name: getRandomNumber(NAMES)
    };
  }

  return comments;
}

// Создает массив из QUANTITY_OBJECT сгенерированных JS объектов
function getArrayPhotos() {
  var photos = [];

  for (var i = 0; i < QUANTITY_MAX_OBJECT; i++) {
    photos[i] = {
      url: 'photos/' + i + 1 + '.jpg',
      description: 'description',
      likes: getRandomArbitrary(QUANTITY_MIN_LIKE, QUANTITY_MAX_LIKE),
      comments: getComments()
    };
  }

  return photos;
}

// Шаблон template в документе
var templatePicture = document.querySelector('#picture').content;

// Клониурет узел(template) и на его основе создает DOM-элементы
function getPhotosInDom(arrays) {
  arrays = getArrayPhotos();

  for (var i = QUANTITY_MIN_OBJECT; i < arrays.length; i++) {
    // Копирует template
    var photoItem = templatePicture.cloneNode(true);
    // Находит элементы, которые нужно заполнить
    var pictureImg = photoItem.querySelector('.picture__img');
    var pictureComments = photoItem.querySelector('.picture__comments');
    var pictureLikes = photoItem.querySelector('.picture__likes');
    // Заполняет шаблон
    pictureImg.src = arrays[i].url;
    pictureLikes.textContent = arrays[i].likes;
    pictureComments.textContent = arrays[i].comments.length;
  }

  return photoItem;
}

// Отрисовывает сгенерированные DOM-элементы в блок .pictures
// Находит контейнер для фотографий
var pictures = document.querySelector('pictures');
// Создает фрагмент
var fragment = document.createDocumentFragment();
// Добавляет моки в фрагмент
fragment.appendChild(getPhotosInDom());
// Добавляет фрагмент в блок pictures
pictures.appendChild(fragment);
