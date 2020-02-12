'use strict';
// данные для моки
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Марс', 'Юпитер', 'Луна', 'Солнце', 'Звезда', 'Космос'];
var QUANTITY_MAX_OBJECT = 25;
var QUANTITY_MIN_COMMENT = 1;
var QUANTITY_MAX_COMMENT = 6;
var QUANTITY_MIN_LIKE = 15;
var QUANTITY_MAX_LIKE = 200;
var ESC_KEY = 'Escape';
var QUANTITY_MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;
var UPLOAD_RESIZE_STEP = 25;
var UPLOAD_RESIZE_MIN = 25;
var UPLOAD_RESIZE_MAX = 100;
var MAX_BLUR = 3;
var MIN_HEAT = 1;
var MAX_HEAT = 3;
var DEFAULT_FILTER = 'none';
var DEFAULT_FILTER_LEVEL = 100;

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
  // создает фрагмент
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    // добавляет моки в фрагмент
    fragment.appendChild(getPhotoElement(photos[i]));
  }

  // добавляет фрагмент в блок pictures
  return pictures.appendChild(fragment);
};

renderPhotosInDom(getArrayPhotos());

// находит блок для комментариев
var socialCommentTemplate = document.querySelector('.social__comments');
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

// !! Загрузка изображения и показ формы редактирования !!
// поле для загрузки изображения
var inputLoad = document.querySelector('#upload-file');
var body = document.querySelector('body');
// закрывает форму с помощью клавиатуры, только если нажата нужная клавиша и фокус не в тегах
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
    closePopup();
  }
};

// открывает форму редактирования изображения
var openPopup = function () {
  uploadEffect.classList.remove('hidden');
  // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  body.classList.add('modal-open');
  // позволяет закрыть форму с помощью клавиатуры
  document.addEventListener('keydown', onPopupEscPress);
  // меняет размер изображения
  uploadResizeInc.addEventListener('click', onResizeInc);
  uploadResizeDec.addEventListener('click', onResizeDec);
  // валидация хеш-тегов
  textHashtags.addEventListener('change', getValidityHashtags);
};

// открывает форму редактирования изображения после загрузки изображения
inputLoad.addEventListener('change', onInputLoadChange);
var onInputLoadChange = function () {
  openPopup();
};

// находит кнопку для закрытия формы редактирования изображения
var buttonClosePopup = document.querySelector('#upload-cancel');
// закрывает форму редактирования изображения
var closePopup = function () {
  uploadEffect.classList.add('hidden');
  body.classList.remove('modal-open');
  // сбрасывает значение поля выбора файла
  inputLoad.value = '';
  // снимает обработчик при закрытии формы
  document.removeEventListener('keydown', onPopupEscPress);
  // возвращает масштаб к 100%
  uploadResizeField.value = DEFAULT_FILTER_LEVEL;
  // сбрасывает эффект на «Оригинал»
  uploadImagePreview.style.filter = filterCssFunction[DEFAULT_FILTER]();
  // очищает поля для ввода хэш-тегов и комментария
  textHashtags.value = '';
  textDescription.value = '';
};

buttonClosePopup.addEventListener('click', closePopup);

// !! Применение эффекта для изображения и редактирование размера изображения !!
var uploadEffect = document.querySelector('.img-upload__overlay');
var uploadImagePreview = document.querySelector('.img-upload__preview');

var filterLevelArea = document.querySelector('.img-upload__effect-level');

var filterUploadLevelValue = document.querySelector('.effect-level__value');

var currentFilter = DEFAULT_FILTER;

// собирает функции для формирования css строки фильтра в справочник
var filterCssFunction = {
  'none': function () {
    return '';
  },
  'chrome': function (level) {
    return 'grayscale(' + level / 100 + ')';
  },
  'sepia': function (level) {
    return 'sepia(' + level / 100 + ')';
  },
  'marvin': function (level) {
    return 'invert(' + level + '%)';
  },
  'phobos': function (level) {
    return 'blur(' + level / 100 * MAX_BLUR + 'px)';
  },
  'heat': function (level) {
    return 'brightness(' + (level / 100 * (MAX_HEAT - MIN_HEAT) + MIN_HEAT) + ')';
  }
};

var setFilterLevel = function (level) {
  var effect = filterCssFunction[currentFilter](level);
  // toFixed() форматирует число, используя запись с фиксированной запятой
  filterUploadLevelValue.value = level.toFixed();
  uploadImagePreview.style.filter = effect;
};

var setDefaultLevel = function () {
  setFilterLevel(DEFAULT_FILTER_LEVEL);
};

var setFilterForUploadImage = function (filterName) {
  filterLevelArea.classList.toggle('hidden', filterName === DEFAULT_FILTER);

  currentFilter = filterName;
  setDefaultLevel();
};

uploadEffect.addEventListener('click', function (evt) {
  if (evt.target.type === 'radio') {
    var filterName = evt.target.value;
    setFilterForUploadImage(filterName);
  }
});

// !! Валидация хеш-тегов !!
var textHashtags = document.querySelector('.text__hashtags');
// валидация хеш-тегов
var getValidityHashtags = function () {
  textHashtags.setCustomValidity(''); // сбросим при изменении, найдем ошибку - поставим
  // находит значения из input
  var inputHashtags = textHashtags.value;
  if (inputHashtags === '') {
    // хэш-теги необязательны;
    return;
  }
  // набор хэш-тегов из input превращает в массив
  var arrayHashtags = inputHashtags.toLowerCase().split(' ');
  if (arrayHashtags.length >= QUANTITY_MAX_HASHTAGS) {
    textHashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
    // дальше не будем проверять отдельные теги
    return;
  }
  // объект для проверки тегов на уникальность, записывает встреченные теги
  var uniqTag = {};
  // цикл, который ходит по полученному массиву и проверяет каждый из хэш-тегов на предмет соответствия ограничениям
  for (var i = 0; i < arrayHashtags.length; i++) {
    if (!arrayHashtags[i].match(/^#[a-zA-Z0-9а-яА-Я]+$/)) {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка) и должен состоять только из букв и чисел');
      break;
    }
    if (arrayHashtags[i].length > MAX_LENGTH_HASHTAG) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега должна быть не больше 20 символов, включая решётку');
      break;
    }
    if (uniqTag[arrayHashtags[i]]) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      break;
    }
    // если все в порядке, записывает тег в список уникальных
    uniqTag[arrayHashtags[i]] = true;
  }
};

// Находит поле для ввода комментариев
var textDescription = document.querySelector('.text__description');

// !! Редактирование размера изображения !!
// находит кнопки для изменения изображения
var uploadResizeField = document.querySelector('.scale__control--value');
var uploadResizeInc = document.querySelector('.scale__control--bigger');
var uploadResizeDec = document.querySelector('.scale__control--smaller');
// находит изображение для трансформации
var uploadImagePreviewForScale = document.querySelector('.img-upload__preview img');

// возвращает целое число
var getScaleValue = function () {
  // parseInt() принимает строку в качестве аргумента и возвращает целое число
  // 10 - основание системы счисления числовой строки
  return parseInt(uploadResizeField.value, 10);
};

// переводит в проценты
var setScaleValue = function (value) {
  uploadResizeField.value = value + '%';
};

// диапазон
var getScaleValueInRange = function (value) {
  return Math.min(UPLOAD_RESIZE_MAX, Math.max(UPLOAD_RESIZE_MIN, value));
};

// создает свойство css для транформации изображения
var setScaleForUploadImage = function (scale) {
  uploadImagePreviewForScale.style.transform = 'scale(' + (scale / 100) + ')';
};

// трансформирует изображение
var changeScale = function (step) {
  var currentScaleValue = getScaleValue();
  var newScaleValue = getScaleValueInRange(currentScaleValue + step);

  setScaleValue(newScaleValue);
  setScaleForUploadImage(newScaleValue);
};

var onResizeInc = function () {
  changeScale(UPLOAD_RESIZE_STEP);
};

var onResizeDec = function () {
  changeScale(-UPLOAD_RESIZE_STEP);
};

// !! Полноразмерный режим любой фотографии и валидация комментариев !!
// находит блок для показа фотографии в полноразмерном режиме
var bigPicture = document.querySelector('.big-picture');

// показывает фотографию в полноразмерном режиме
var showBigPicture = function (item) {
  // удаляет класс hidden
  bigPicture.classList.remove('hidden');
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
    fragment.appendChild(getCommentElement(item.comments[i]));
  }
  // чистит блок комментариев в разметке
  socialCommentTemplate.innerHTML = '';
  // добавляет новые комментарии
  socialCommentTemplate.appendChild(fragment);

  // описание фотографии description
  var socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = item.description;

  // скрывает блоки счётчика комментариев
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  body.classList.add('modal-open');
  // закрывает фотографию с клавиатуры
  document.addEventListener('keydown', function (evt) {
    bigPicture.classList.add('hidden');
    if (evt.key === ESC_KEY) {
      body.classList.remove('modal-open');
    }
  });

  return item;
};

// находит кнопку для выхода из полноэкранного просмотра изображения
var pictureClose = document.querySelector('#picture-cancel');
// закрывает фотографию в полноразмерном режим
pictureClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// находит минитюру изображений, чтобы при клике показать большое изображение
var miniPictures = document.querySelectorAll('.picture__img');
// массив с изображениями;
var links = getArrayPhotos();

// открывает миниатюрные фотографии
for (var b = 0; b < miniPictures.length; b++) {
  (function (picture) {
    picture.addEventListener('click', function () {
      // индекс из цикла по коллекции картинок
      showBigPicture(links[b]);
    });
    // ??? НЕ МОГУ ПОНЯТЬ, ПОЧЕМУ links[b] TypeError: undefined is not an object (evaluating 'item.url')
    // ЕСЛИ ПИШУ for (var b = 0; b < miniPictures.length; b++) { console.log(links[b]);} ТО ВЫВОДИТ ОБЪЕКТЫ
  })(miniPictures[b]);
}
