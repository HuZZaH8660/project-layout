/** Константы и переменная flag */
const INITURL = new URL("https://ws.audioscrobbler.com/2.0/");
const CONTAINER = document.querySelector(".cards__container");
const SEARCH = document.querySelector(".header__search");
const ERROR = "Произошла ошибка, смотрите стек вызовов выше"
let flag = "musicTop";

/** Обработчик события для поиска по трекам или исполнителям в зависимости от значения flag */
SEARCH.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value === "") {
      switch (flag) {
        case "musicTop":
          setTopMusicSettings();
          break;
        case "artistsTop":
          setTopArtistsSettings();
          break;
      }
    } else {
      switch (flag) {
        case "musicTop":
          setSearchedMusicSettings(e.target.value);
          break;
        case "artistsTop":
          setSearchedArtistsSettings(e.target.value);
          break;
      }
    }
  }
});

/** Очистка контейнера с карточками */
function clearContainer() {
  if (CONTAINER.firstChild) {
    while (CONTAINER.firstChild) {
      CONTAINER.removeChild(CONTAINER.lastChild);
    }
  }
}

/**
 * Поле с названием трека или с именем исполнителя
 * @param {*} item трек/исполнитель
 * @returns summary элемент с названием item
 */
function createName(item) {
  const ITEMNAME = document.createElement("summary");
  ITEMNAME.className = "card__summary";
  ITEMNAME.textContent = item.name;
  return ITEMNAME;
}

/**
 * Оболочка a для ссылки на трек/исполнителя или исполнителя трека в зависимости от контекста вызова
 * @param {*} item трек/исполнитель
 * @param {*} choice контекст вызова
 * @returns a элемент
 */
function createAElement(item, choice) {
  const AELEMENT = document.createElement("a");
  AELEMENT.className = "card__link";
  switch (choice){
    case "artistForTrack":
      AELEMENT.href = item.artist.url;
      break;
    case "trackOrArtist":
      AELEMENT.href = item.url;
      break;
  }
  AELEMENT.target = "_blank";
  AELEMENT.rel = "noopener";
  return AELEMENT;
}

/**
 * Функция для создания li элемента в зависимости от контекста вызова
 * @param {*} item трек/исполнитель
 * @param {*} choice контекст вызова
 * @returns li элемент
 */
function createLiElement(item, choice) {
  const LIELEMENT = document.createElement("li");
  switch (choice){
    case "artistName":
      LIELEMENT.textContent = item.artist.name;
      break;
    case "playCount":
      LIELEMENT.textContent = "Количество прослушиваний: " + item.playcount;
      break;
    case "listenersCount":
      LIELEMENT.textContent = "Количество слушателей: " + item.listeners;
      break;
    case "lastFMLink":
      LIELEMENT.textContent = "Ссылка на Last FM";
      break;
  }
  return LIELEMENT;
}

/**
 * Создание листа, содержащего информацию о треке/исполнителе
 * @returns ul элемент
 */
function createList() {
  const LIST = document.createElement("ul");
  LIST.className = "card__list";
  return LIST;
}

/**
 * Очистка контейнера и установка параметров GET-запроса для списка лучших треков
 */
function setTopMusicSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettoptracks&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = "musicTop";
  getTopMusic();
}

/**
 * GET-запрос списка лучших треков и создание списка
 */
function getTopMusic() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.tracks.track.forEach((track) => {
        const CARD = document.createElement("details");
        CARD.className = "big__card";
        const LIST = createList();
        const TRACKLINK = createAElement(track, "trackOrArtist");
        CARD.appendChild(createName(track));
        const ARTISTLINK = createAElement(track, "artistForTrack")
        ARTISTLINK.appendChild(createLiElement(track, "artistName"));
        LIST.appendChild(ARTISTLINK);
        LIST.appendChild(createLiElement(track, "playCount"));
        LIST.appendChild(createLiElement(track, "listenersCount"));
        TRACKLINK.appendChild(createLiElement(null, "lastFMLink"));
        LIST.appendChild(TRACKLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    )
    .catch((e) => console.log(e, ERROR));
}

/**
 * Очистка контейнера и установка параметров GET-запроса для поиска по трекам
 * @param {*} value значение из поисковой строки
 */
function setSearchedMusicSettings(value) {
  clearContainer();
  INITURL.search = `?method=track.search&limit=50&track=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
  flag = "musicTop";
  getSearchedMusic();
}

/**
 * GET-запрос списка поиска по трекам и создание результатов поиска
 */
function getSearchedMusic() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.results.trackmatches.track.forEach((track) => {
        const CARD = document.createElement("details");
        CARD.className = "small__card";
        const LIST = createList();
        const TRACKLINK = createAElement(track, "trackOrArtist");
        CARD.appendChild(createName(track));
        LIST.appendChild(createLiElement(track, "listenersCount"));
        TRACKLINK.appendChild(createLiElement(null, "lastFMLink"));
        LIST.appendChild(TRACKLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    )
    .catch((e) => console.log(e, ERROR));
}

/**
 * Очистка контейнера и установка параметров GET-запроса для списка лучших исполнителей
 */
function setTopArtistsSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettopartists&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = "artistsTop";
  getTopArtists();
}

/**
 * GET-запрос списка лучших исполнителей и создание списка
 */
function getTopArtists() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.artists.artist.forEach((artist) => {
        const CARD = document.createElement("details");
        CARD.className = "medium__card";
        const LIST = createList();
        const ARTISTLINK = createAElement(artist, "trackOrArtist");
        CARD.appendChild(createName(artist));
        LIST.appendChild(createLiElement(artist, "playCount"));
        LIST.appendChild(createLiElement(artist, "listenersCount"));
        ARTISTLINK.appendChild(createLiElement(null, "lastFMLink"));
        LIST.appendChild(ARTISTLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    )
    .catch((e) => console.log(e, ERROR));
}

/**
 * Очистка контейнера и установка параметров GET-запроса для поиска по исполнителям
 * @param {*} value значение из поисковой строки
 */
function setSearchedArtistsSettings(value) {
  clearContainer();
  INITURL.search =
    `?method=artist.search&artist=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
  flag = "artistsTop";
  getSearchedArtists();
}

/**
 * GET-запрос списка поиска по исполнителям и создание результатов поиска
 */
function getSearchedArtists() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.results.artistmatches.artist.forEach((artist) => {
        const CARD = document.createElement("details");
        CARD.className = "small__card";
        const LIST = createList();
        const ARTISTLINK = createAElement(artist, "trackOrArtist");
        CARD.appendChild(createName(artist));
        LIST.appendChild(createLiElement(artist, "listenersCount"));
        ARTISTLINK.appendChild(createLiElement(null, "lastFMLink"));
        LIST.appendChild(ARTISTLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    )
    .catch((e) => console.log(e, ERROR));
}

/** Вызов функции со списком треков */
setTopMusicSettings();
