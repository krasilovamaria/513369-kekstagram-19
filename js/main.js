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
var socialCommentTemplate = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');

// Заполняет комментарий
function getCommentElement(data) {
  var commentItemCopy = socialComment.cloneNode(true);
  // Находит элементы, которые нужно заполнить
  var socialCommentImg = commentItemCopy.querySelector('img');
  var socialText = commentItemCopy.querySelector('.social__text');
  // Заполняет фрагмент
  socialCommentImg.src = data.avatar;
  socialCommentImg.alt = data.name;
  socialText.textContent = data.message;

  return commentItemCopy;
}

// Находит блок для показа фотографии в полноразмерном режиме
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
  // Создает фрагмент, для вставки комменатриев
  var fragment = document.createDocumentFragment();
  // Заполняет новые комментарии
  for (var i = 0; i < item.comments.length; i++) {
    fragment.appendChild(getCommentElement(item.comments[i]));
  }
  // Чистит блок комментариев в разметке
  socialCommentTemplate.innerHTML = '';
  // Добавляет новые комментарии
  socialCommentTemplate.appendChild(fragment);

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

// Находит кнопку для выхода из полноэкранного просмотра изображения
var pictureClose = document.querySelector('#picture-cancel');
// Закрывает фотографию в полноразмерном режиме
pictureClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// Находит минитюру изображений, чтобы при клике показать большое изображение
var pictureMiniMode = document.querySelector('.picture__img');
// Открывает первую миниатюрную фотографию
pictureMiniMode.addEventListener('click', function () {
  bigPicture.classList.remove('hidden');
  showBigPicture(getArrayPhotos()[0]);

  // Закрывает фотографию с клавиатуры
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  });
});

// !! Загрузка изображения и показ формы редактирования !!

// Находит поле для загрузки изображения
var uploadInput = document.querySelector('#upload-file');
// Находит форму редактирования изображения
var formImg = document.querySelector('.img-upload__overlay');
var body = document.querySelector('body');

// Открывает форму редактирования изображения
function openPopup() {
  formImg.classList.remove('hidden');
  // Добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  body.classList.add('modal-open');

  // Закрывает форму с помощью клавиатуры
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      formImg.classList.add('hidden');
    }
  });
  effectNone.style = getNoneEffect();
  effectСhrome.addEventListener('click', getChrome);
  effectSepia.addEventListener('click', getSepia);
  effectMarvin.addEventListener('click', getMarvin);
  effectPhobos.addEventListener('click', getPhobos);
  effectHeat.addEventListener('click', getHeat);
  // Позволяет передвигать pin
  pinOnSlaider.addEventListener('mouseup', changeValueEffect);
}

// Открывает форму редактирования изображения после загрузки изображения
uploadInput.addEventListener('change', openPopup);

// Закрывает форму редактирования изображения
// Находит кнопку для закрытия формы редактирования изображения
var buttonClosePopup = document.querySelector('#upload-cancel');

function closePopup() {
  formImg.classList.add('hidden');
  body.classList.remove('modal-open');
  // Cбрасывает значение поля выбора файла
  uploadInput.innerHTML = '';
}

buttonClosePopup.addEventListener('click', closePopup);

// !! Применение эффекта для изображения и редактирование размера изображения !!

// Находит блок с эффектами для изображения
var imgUploadEffects = document.querySelector('.img-upload__effects');
// Находит фотографию, на которую нужно наложить фильтра
var imgForEffect = document.querySelector('.img-upload__preview img');
// Находит слайдер(изменение глубины эффекта)
var slaiderPopup = document.querySelector('.img-upload__effect-level');
// Находит фото без эффекта
var effectNone = imgUploadEffects.querySelector('#effect-none');
// Находит остальные эффекты
var effectСhrome = imgUploadEffects.querySelector('#effect-chrome');
var effectSepia = imgUploadEffects.querySelector('#effect-sepia');
var effectMarvin = imgUploadEffects.querySelector('#effect-marvin');
var effectPhobos = imgUploadEffects.querySelector('#effect-phobos');
var effectHeat = imgUploadEffects.querySelector('#effect-heat');

// Фильтр без эффекта
function getNoneEffect() {
  // Скрывает слайдер
  slaiderPopup.classList.add('hidden');
}

// Заполняет эффект
function getEffect(effect) {
  // Показывает слайдер
  slaiderPopup.classList.remove('hidden');
  // Сбрасывает присвоенный фильтр(класс), чтобы можно было переключаться между фильтрами
  imgForEffect.classList = [];
  return imgForEffect.classList.add('effects__preview--' + effect);
}

// Применяет эффекты, чтобы при открытии формы редактирования можно было переключаться между фильтрами
function getChrome() {
  return getEffect('chrome');
}

function getSepia() {
  return getEffect('sepia');
}

function getMarvin() {
  return getEffect('marvin');
}

function getPhobos() {
  return getEffect('phobos');
}

function getHeat() {
  return getEffect('heat');
}

// Интенисвность эффекта
// Находит ползунок в слайдере, который меняет интенсивность эффекта
var pinOnSlaider = slaiderPopup.querySelector('.effect-level__pin');
// Находит уровень эффекта, накладываемого на изображение
var valueEffectOnPopup = document.querySelector('.effect-level__value');

// Изменяет интенсивность эффекта
function changeValueEffect() { // HHEEELLLLPPPPPPP
  // возвращает true/false, в зависимости от того, есть ли у элемента класс class
  if (imgForEffect.classList.contains('effects__preview--chrome')) {
    // меняет интенсивность эффекта
    imgForEffect.filter = 'grayscale(0..1)';
    valueEffectOnPopup.value = ''; // ?????

  } else if (imgForEffect.classList.contains('effects__preview--sepia')) {
    imgForEffect.filter = 'sepia(0..1)';
    valueEffectOnPopup.value = '';

  } else if (imgForEffect.classList.contains('effects__preview--marvin')) {
    imgForEffect.filter = 'invert(0..100%)';
    valueEffectOnPopup.value = '';

  } else if (imgForEffect.classList.contains('effects__preview--phobos')) {
    imgForEffect.filter = 'blur(0..3px)';
    valueEffectOnPopup.value = '';

  } else if (imgForEffect.classList.contains('effects__preview--heat')) {
    imgForEffect.filter = 'brightness(1..3)';
    valueEffectOnPopup.value = '';
  }

  // не могу понять что должна вернуть
}

// Редактирование размера изображения
// Находит кнопки для изменения изображения
var scaleButtonSmaller = document.querySelector('.scale__control--smaller');
var scaleButtonBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');

function changeScaleOnSmaller() {
 // Грусть тоска печалька
}
