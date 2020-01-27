'use strict';

// Функция генерации случайных чисел в заданном диапазоне
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Функция генерации случайных чисел
function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

// Создаем данные для моки
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
// Функция для создания массива из 25 сгенерированных JS объектов
function getArrayPhotos() {
  var arr = [];
  for (var i = 0; i < 25; i++) {
    arr[i] = {
      url: 'photos/' + i + '.jpg',
      description: ' ', // не поняла что сюда записывать
      likes: getRandomArbitrary(15, 200),
      comments: {
        avatar: 'img/avatar' + getRandomArbitrary(1, 6) + '.svg',
        message: messages[getRandomNumber(messages.length)],
        name: names[getRandomNumber(names.length)]
      }
    };
  }
  return arr;
}

/*
На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы,
соответствующие фотографиям и заполните их данными из массива:
Адрес изображения url подставьте как src изображения.
Количество лайков likes подставьте как текстовое содержание элемента .picture__likes.
Количество комментариев comments подставьте как текстовое содержание элемента .picture__comments.
*/

// Шаблон template в документе
var templatePicture = document.querySelector('#picture').content;
// Нужный элемент в template
var pictureImg = templatePicture.querySelector('.picture__img');
var pictureComments = templatePicture.querySelector('.picture__comments');
var pictureLikes = templatePicture.querySelector('.picture__likes');

pictureImg.src = '???';
pictureLikes.textContent = '???';
pictureComments.textContent = '???';

var objectsPhotos = getArrayPhotos();
