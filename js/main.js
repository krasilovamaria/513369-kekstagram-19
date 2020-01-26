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
var comments = [
  {
    avatar: 'img/avatar' + getRandomArbitrary(1, 6) + '.svg',
    message: messages[getRandomNumber(messages.length)],
    name: names[getRandomNumber(names.length)]
  }
];

for (var i = 1; i <= 25; i++) {
  var urlPicture = 'photos/' + i + '.jpg'; // как вывести все итерации, а не последнюю?
}
