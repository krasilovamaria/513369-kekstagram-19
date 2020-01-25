'use strict';

// Функция генерации случайных чисел в заданном диапазоне
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Функция генерации случайных чисел
function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

// Функция создания DOM-элемента на основе JS-объекта
// 1. Находим адрес картинки
for (var i = 1; i <= 25; i++) {
  var urlPicture = 'photos/' + i + '.jpg';
}

// 2. Прописываем описание фотографий
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
var comments = [
  {
    avatar: 'img/avatar' + getRandomArbitrary(1, 6) + '.svg',
    message: messages[getRandomNumber(messages.length)],
    name: names[getRandomNumber(names.length)]
}
];

function makeElement(tagName, className) {
  var picture = document.createElement(tagName);
  picture.classList.add(className);

  return picture;
}

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
function createPicture() {
  var listItem = makeElement('div', 'picture');

  var picture = makeElement('img', 'picture__img');
  picture.src = urlPicture;
  picture.alt = ' ';
  listItem.appendChild(picture);

  var pictureInfo = makeElement('p', 'picture__info');
  listItem.appendChild(pictureInfo);
  var pictureComment = makeElement('span', 'picture__comments');
  listItem.appendChild(pictureComment);
  var pictureLike = makeElement('span', 'picture__likes');
  listItem.appendChild(pictureLike);

  return listItem;
}

createPicture();
