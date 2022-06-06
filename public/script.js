/** Константы и переменная flag */
const INITURL = new URL("https://ws.audioscrobbler.com/2.0/");
const CONTAINER = document.querySelector(".cards__container");
const SEARCH = document.querySelector(".header__search");
let flag = 1;

/** Обработчик события для поиска по трекам или исполнителям в зависимости от значения flag */
SEARCH.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (e.target.value === "") {
      setTopMusicSettings();
    } else {
      switch (flag) {
        case 1:
          setSearchedMusicSettings(e.target.value);
        case 2:
          setSearchedArtistsSettings(e.target.value);
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
 * Оболочка a для ссылки на исполнителя трека
 * @param {*} item трек/исполнитель
 * @returns a элемент
 */
function createArtistLink(item) {
  const ARTISTLINK = document.createElement("a");
  ARTISTLINK.className = "card__link";
  ARTISTLINK.href = item.artist.url;
  ARTISTLINK.target = "_blank";
  ARTISTLINK.rel = "noopener";
  return ARTISTLINK;
}

/**
 * Имя исполнителя по треку
 * @param {*} item трек
 * @returns li элемент
 */
function createArtist(item) {
  const ARTIST = document.createElement("li");
  ARTIST.textContent = item.artist.name;
  return ARTIST;
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
 * Поле с количеством прослушиваний трека/исполнителя
 * @param {*} item трек/исполнитель
 * @returns li элемент
 */
function createPlayCount(item) {
  const PLAYCOUNT = document.createElement("li");
  PLAYCOUNT.textContent = "Количество прослушиваний: " + item.playcount;
  return PLAYCOUNT;
}

/**
 * Поле с количеством слушателей трека/исполнителя
 * @param {*} item трек/исполнитель
 * @returns li элемент
 */
function createListenersCount(item) {
  const LISTENERSCOUNT = document.createElement("li");
  LISTENERSCOUNT.textContent = "Количество слушателей: " + item.listeners;
  return LISTENERSCOUNT;
}

/**
 * Оболочка a для ссылки на трек/исполнителя
 * @param {*} item трек/исполнитель
 * @returns a элемент
 */
function createLink(item) {
  const TRACKLINK = document.createElement("a");
  TRACKLINK.className = "card__link";
  TRACKLINK.href = item.url;
  TRACKLINK.target = "_blank";
  TRACKLINK.rel = "noopener";
  return TRACKLINK;
}

/**
 * Поле с количеством прослушиваний трека/исполнителя
 * @returns li элемент
 */
function createLastFMLink() {
  const LASTFMLINK = document.createElement("li");
  LASTFMLINK.textContent = "Ссылка на Last FM";
  return LASTFMLINK;
}

/**
 * Очистка контейнера и установка параметров GET-запроса для списка лучших треков
 */
function setTopMusicSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettoptracks&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = 1;
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
        const TRACKLINK = createLink(track);
        CARD.appendChild(createName(track));
        const ARTISTLINK = createArtistLink(track)
        ARTISTLINK.appendChild(createArtist(track));
        LIST.appendChild(ARTISTLINK);
        LIST.appendChild(createPlayCount(track));
        LIST.appendChild(createListenersCount(track));
        TRACKLINK.appendChild(createLastFMLink());
        LIST.appendChild(TRACKLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    );
}

/**
 * Очистка контейнера и установка параметров GET-запроса для поиска по трекам
 * @param {*} value значение из поисковой строки
 */
function setSearchedMusicSettings(value) {
  clearContainer();
  INITURL.search = `?method=track.search&limit=50&track=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
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
        const TRACKLINK = createLink(track);
        CARD.appendChild(createName(track));
        LIST.appendChild(createListenersCount(track));
        TRACKLINK.appendChild(createLastFMLink());
        LIST.appendChild(TRACKLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    );
}

/**
 * Очистка контейнера и установка параметров GET-запроса для списка лучших исполнителей
 */
function setTopArtistsSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettopartists&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = 2;
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
        const ARTISTLINK = createLink(artist);
        CARD.appendChild(createName(artist));
        LIST.appendChild(createPlayCount(artist));
        LIST.appendChild(createListenersCount(artist));
        ARTISTLINK.appendChild(createLastFMLink());
        LIST.appendChild(ARTISTLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    );
}

/**
 * Очистка контейнера и установка параметров GET-запроса для поиска по исполнителям
 * @param {*} value значение из поисковой строки
 */
function setSearchedArtistsSettings(value) {
  clearContainer();
  INITURL.search =
    `?method=artist.search&artist=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
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
        const ARTISTLINK = createLink(artist);
        CARD.appendChild(createName(artist));
        LIST.appendChild(createListenersCount(artist));
        ARTISTLINK.appendChild(createLastFMLink());
        LIST.appendChild(ARTISTLINK);
        CARD.appendChild(LIST);
        CONTAINER.append(CARD);
      })
    );
}

/** Вызов функции со списком треков */
setTopMusicSettings();
