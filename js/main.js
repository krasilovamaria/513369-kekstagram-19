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
var BLUR = 3;
var BRIGHTNESS = 3;
var MIN_VALUE_BRIGHTNESS = 1;
var BEGIN_VALUE_LEVEL = 100;
var QUANTITY_MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;
var UPLOAD_RESIZE_STEP = 25;
var UPLOAD_RESIZE_MIN = 25;
var UPLOAD_RESIZE_MAX = 100;

// функция генерации случайных чисел
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// функция, которая принимает массив в параметр и вернет его случайный элемент
function getRandomItem(items) {
  return items[getRandomArbitrary(0, items.length)];
}

// создает comments
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

// создает массив из сгенерированных JS объектов
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

// шаблон template в документе
var templatePicture = document.querySelector('#picture').content;

// заполняет один элемент, принимает объект с данным параметром и возвращает готовый элемент
function getPhotoElement(data) {
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
}

// отрисовывает сгенерированные DOM-элементы в блок .pictures
function renderPhotosInDom(photos) {
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
}

renderPhotosInDom(getArrayPhotos());

// находит блок для комментариев
var socialCommentTemplate = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');

// заполняет комментарий
function getCommentElement(data) {
  var commentItemCopy = socialComment.cloneNode(true);
  // находит элементы, которые нужно заполнить
  var socialCommentImg = commentItemCopy.querySelector('img');
  var socialText = commentItemCopy.querySelector('.social__text');
  // заполняет фрагмент
  socialCommentImg.src = data.avatar;
  socialCommentImg.alt = data.name;
  socialText.textContent = data.message;

  return commentItemCopy;
}

// находит блок для показа фотографии в полноразмерном режиме
var bigPicture = document.querySelector('.big-picture');

// показывает фотографию в полноразмерном режиме
function showBigPicture(item) {
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
  var body = document.querySelector('body');
  body.classList.add('modal-open');

  return item;
}

// находит кнопку для выхода из полноэкранного просмотра изображения
var pictureClose = document.querySelector('#picture-cancel');
// закрывает фотографию в полноразмерном режиме
pictureClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// находит минитюру изображений, чтобы при клике показать большое изображение
var pictureMiniMode = document.querySelector('.picture__img');
// открывает первую миниатюрную фотографию
pictureMiniMode.addEventListener('click', function () {
  bigPicture.classList.remove('hidden');
  showBigPicture(getArrayPhotos()[0]);

  // закрывает фотографию с клавиатуры (переделать попозже)
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      bigPicture.classList.add('hidden');
    }
  });
});

// !! Загрузка изображения и показ формы редактирования !!
// поле для загрузки изображения
var inputLoad = document.querySelector('#upload-file');
// форма редактирования изображения
var formImg = document.querySelector('.img-upload__overlay');
var body = document.querySelector('body');
// находит все кнопки смены фильтра
var effects = document.querySelectorAll('.effects__radio');
// закрывает форму с помощью клавиатуры, только если нажата нужная клавиша и фокус не в тегах
function onPopupEscPress(evt) {
  if (evt.key === ESC_KEY && textHashtags !== document.activeElement) {
    closePopup();
  }
}
// открывает форму редактирования изображения
function openPopup() {
  formImg.classList.remove('hidden');
  // добавляет на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  body.classList.add('modal-open');
  // позволяет закрыть форму с помощью клавиатуры
  document.addEventListener('keydown', onPopupEscPress);

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('change', onEffectChange);
  }

  //  меняет элемент, на котором произошло событие
  function onEffectChange(evt) {
    var filterName = evt.target.value;
    changeFilter(filterName);
  }

  // позволяет передвигать pin
  pinOnSlaider.addEventListener('mouseup', changeValueEffect);
  // меняет размер изображения
  uploadResizeInc.addEventListener('click', onResizeInc);
  uploadResizeDec.addEventListener('click', onResizeDec);
  // валидация хеш-тегов
  textHashtags.addEventListener('change', getValidityHashtags);
}

// открывает форму редактирования изображения после загрузки изображения
inputLoad.addEventListener('change', openPopup);
// находит кнопку для закрытия формы редактирования изображения
var buttonClosePopup = document.querySelector('#upload-cancel');

// закрывает форму редактирования изображения
function closePopup() {
  formImg.classList.add('hidden');
  body.classList.remove('modal-open');
  // сбрасывает значение поля выбора файла
  inputLoad.value = '';
  // снимает обработчик при закрытии формы
  document.removeEventListener('keydown', onPopupEscPress);
  // возвращает масштаб к 100%
  setScaleValue(100);
  // сбрасывает эффект на «Оригинал»;
  imgForEffect.style.filter = filterCssFunction['none'];
  // очищает поля для ввода хэш-тегов и комментария
  textHashtags.value = '';
  textDescription.value = '';
}

buttonClosePopup.addEventListener('click', closePopup);

// !! Применение эффекта для изображения и редактирование размера изображения !!
// находит фотографию, на которую нужно наложить фильтра
var imgForEffect = document.querySelector('.img-upload__preview img');
// находит слайдер(изменение глубины эффекта)
var slaiderPopup = document.querySelector('.img-upload__effect-level');
var currentFilter;

// заполняет эффект
function changeFilter(filterName) {
  if (currentFilter) {
    // сбрасывает присвоенный фильтр(класс)
    imgForEffect.classList.remove('effects__preview--' + currentFilter);
  }
  imgForEffect.classList.add('effects__preview--' + filterName);
  currentFilter = filterName;
  // скрывает слайдер
  slaiderPopup.classList.toggle('hidden', currentFilter === 'none');
  // при переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%)
  valueEffect.value = BEGIN_VALUE_LEVEL;
  imgForEffect.style.filter = '';
}

// применяет эффекты, чтобы при открытии формы редактирования можно было переключаться между фильтрами
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
    return 'blur(' + level / 100 * BLUR + 'px)';
  },
  'heat': function (level) {
    return 'brightness(' + (level / 100 * (BRIGHTNESS - MIN_VALUE_BRIGHTNESS) + MIN_VALUE_BRIGHTNESS) + ')';
  }
};

// !! Интенсивность эффекта !!
// находит ползунок в слайдере, который меняет интенсивность эффекта
var pinOnSlaider = slaiderPopup.querySelector('.effect-level__pin');
// находит уровень эффекта, накладываемого на изображение
var valueEffect = document.querySelector('.effect-level__value');
// изменяет интенсивность эффекта
function changeValueEffect() {
  // var beginPinPosition = 20;
  // var widthSlider = 495;
  // от ширины линии находит позицию пина
  var currentPinPosition = 20; // beginPinPosition / widthSlider * 100
  imgForEffect.style.filter = filterCssFunction[currentFilter](currentPinPosition);
  // записывает уровень интенсивности в input для отправки на сервер
  valueEffect.value = currentPinPosition / 100;
}

// !! Валидация хеш-тегов !!
var textHashtags = document.querySelector('.text__hashtags');
// валидация хеш-тегов
function getValidityHashtags() {
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
}

// Находит поле для ввода комментариев
var textDescription = document.querySelector('.text__description');

// !! Редактирование размера изображения !!
// находит кнопки для изменения изображения
var uploadResizeField = document.querySelector('.scale__control--value');
var uploadResizeInc = document.querySelector('.scale__control--bigger');
var uploadResizeDec = document.querySelector('.scale__control--smaller');

// возвращает целое число
function getScaleValue() {
  // parseInt() принимает строку в качестве аргумента и возвращает целое число
  // 10 - основание системы счисления числовой строки
  return parseInt(uploadResizeField.value, 10);
}

// переводит в проценты
function setScaleValue(value) {
  uploadResizeField.value = value + '%';
}

// диапазон
function getScaleValueInRange(value) {
  return Math.min(UPLOAD_RESIZE_MAX, Math.max(UPLOAD_RESIZE_MIN, value));
}

// создает свойство css для транформации изображения
function setScaleForUploadImage(scale) {
  imgForEffect.style.transform = 'scale(' + (scale / 100) + ')';
}

// трансформирует изображение
function changeScale(step) {
  var currentScaleValue = getScaleValue();
  var newScaleValue = getScaleValueInRange(currentScaleValue + step);

  setScaleValue(newScaleValue);
  setScaleForUploadImage(newScaleValue);
}

function onResizeInc() {
  changeScale(UPLOAD_RESIZE_STEP);
}

function onResizeDec() {
  changeScale(-UPLOAD_RESIZE_STEP);
}
