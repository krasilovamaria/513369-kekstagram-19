'use strict';
// модуль, который добавляет комментарии к изображению;
(function () {
  // находит кнопку 'Загрузить еще'
  var loaderCommentsBtn = document.querySelector('.comments-loader');

  // создает элемент для списка комментариев
  var createComment = function () {
    // создает новый li
    var comment = document.createElement('li');
    // добавляет li класс из разметки для комментариев
    comment.classList.add('social__comment');

    return comment;
  };

  // создает список комментариев, чтобы добавить их в разметку
  var createCommentsCollection = function (collection) {
    var documentFragment = document.createDocumentFragment();
    // добавляет в новый массив комментарии
    collection.forEach(function () {
      documentFragment.appendChild(createComment());
    });

    return documentFragment;
  };

  // передает данные для комментариев
  var onLoaderCommentsClick = function (comments) {
    createCommentsCollection(comments);
  };

  loaderCommentsBtn.addEventListener('click', onLoaderCommentsClick);
})();
