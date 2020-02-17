'use strict';
// модуль, который создаёт данные для моки;
(function () {
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
  var QUANTITY_MAX_OBJECT = 25;
  var QUANTITY_MIN_COMMENT = 1;
  var QUANTITY_MAX_COMMENT = 6;
  var QUANTITY_MIN_LIKE = 15;
  var QUANTITY_MAX_LIKE = 200;

  // функция генерации случайных чисел
  var getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // функция, которая принимает массив в параметр и вернет его случайный элемент
  var getRandomItem = function (items) {
    return items[getRandomArbitrary(0, items.length)];
  };

  // создает comments
  var getComments = function () {
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
  };

  // создает массив из сгенерированных JS объектов
  var getArrayPhotos = function () {
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
  };

  window.data = {
    getArrayPhotos: getArrayPhotos
  };
})();
