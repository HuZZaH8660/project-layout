const INITURL = new URL("http://ws.audioscrobbler.com/2.0/");
const CONTAINER = document.querySelector(".cards__container");
const SEARCH = document.querySelector(".header__search");
let flag = 1;

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

function clearContainer() {
  if (CONTAINER.firstChild) {
    while (CONTAINER.firstChild) {
      CONTAINER.removeChild(CONTAINER.lastChild);
    }
  }
}

function createName(item) {
  itemName = document.createElement("summary");
  itemName.className = "card__summary";
  itemName.textContent = item.name;
  return itemName;
}

function createArtistLink(item) {
  artistLink = document.createElement("a");
  artistLink.className = "card__link";
  artistLink.href = item.artist.url;
  artistLink.target = "_blank";
  artistLink.rel = "noopener";
  return artistLink;
}

function createArtist(item) {
  artist = document.createElement("li");
  artist.textContent = item.artist.name;
  return artist;
}

function createList() {
  list = document.createElement("ul");
  list.className = "card__list";
  return list;
}

function createPlayCount(item) {
  playCount = document.createElement("li");
  playCount.textContent = "Количество прослушиваний: " + item.playcount;
  return playCount;
}

function createListenersCount(item) {
  listenersCount = document.createElement("li");
  listenersCount.textContent = "Количество слушателей: " + item.listeners;
  return listenersCount;
}

function createLink(item) {
  trackLink = document.createElement("a");
  trackLink.className = "card__link";
  trackLink.href = item.url;
  trackLink.target = "_blank";
  trackLink.rel = "noopener";
  return trackLink;
}

function createLastFMLink() {
  lastFMLink = document.createElement("li");
  lastFMLink.textContent = "Ссылка на Last FM";
  return lastFMLink;
}

function setTopMusicSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettoptracks&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = 1;
  getTopMusic();
}

function getTopMusic() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.tracks.track.forEach((track) => {
        card = document.createElement("details");
        card.className = "big__card";
        list = createList();
        trackLink = createLink(track);
        card.appendChild(createName(track));
        artistLink = createArtistLink(track)
        artistLink.appendChild(createArtist(track));
        list.appendChild(artistLink);
        list.appendChild(createPlayCount(track));
        list.appendChild(createListenersCount(track));
        trackLink.appendChild(createLastFMLink());
        list.appendChild(trackLink);
        card.appendChild(list);
        CONTAINER.append(card);
      })
    );
}

function setSearchedMusicSettings(value) {
  clearContainer();
  INITURL.search = `?method=track.search&limit=50&track=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
  getSearchedMusic();
}

function getSearchedMusic() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.results.trackmatches.track.forEach((track) => {
        card = document.createElement("details");
        card.className = "small__card";
        list = createList();
        trackLink = createLink(track);
        card.appendChild(createName(track));
        list.appendChild(createListenersCount(track));
        trackLink.appendChild(createLastFMLink());
        list.appendChild(trackLink);
        card.appendChild(list);
        CONTAINER.append(card);
      })
    );
}

function setTopArtistsSettings() {
  clearContainer();
  INITURL.search =
    "?method=chart.gettopartists&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json";
  flag = 2;
  getTopArtists();
}

function getTopArtists() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.artists.artist.forEach((artist) => {
        card = document.createElement("details");
        card.className = "medium__card";
        list = createList();
        artistLink = createLink(artist);
        card.appendChild(createName(artist));
        list.appendChild(createPlayCount(artist));
        list.appendChild(createListenersCount(artist));
        artistLink.appendChild(createLastFMLink());
        list.appendChild(artistLink);
        card.appendChild(list);
        CONTAINER.append(card);
      })
    );
}

function setSearchedArtistsSettings(value) {
  clearContainer();
  INITURL.search =
    `?method=artist.search&artist=${value}&api_key=1fe17e4127c70141e07c5d5e79122d40&format=json`;
  getSearchedArtists();
}

function getSearchedArtists() {
  fetch(INITURL)
    .then((result) => result.json())
    .then((data) =>
      data.results.artistmatches.artist.forEach((artist) => {
        card = document.createElement("details");
        card.className = "small__card";
        list = createList();
        artistLink = createLink(artist);
        card.appendChild(createName(artist));
        list.appendChild(createListenersCount(artist));
        artistLink.appendChild(createLastFMLink());
        list.appendChild(artistLink);
        card.appendChild(list);
        CONTAINER.append(card);
      })
    );
}

setTopMusicSettings();
