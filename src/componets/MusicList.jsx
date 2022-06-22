import { useState, useEffect } from "react";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

function MusicList(props) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const INITURL = process.env.REACT_APP_API_URL;
    const INITKEY = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      const reply =
        props.search === ""
          ? await fetch(
              `${INITURL}?method=chart.gettoptracks&limit=50&api_key=${INITKEY}&format=json`
            )
          : await fetch(
              `${INITURL}?method=track.search&limit=50&track=${props.search}&api_key=${INITKEY}&format=json`
            );
      const data = await reply.json();
      const foundTracks = data.tracks ? data.tracks : data.results.trackmatches;
      setSongs(foundTracks.track);
    };
    fetchData();
  }, [props.search]);

  if (props.search === "") {
    return songs.map((song) => (
      <BigCard
        key={song.url}
        name={song.name}
        artisturl={song.artist.url}
        url={song.url}
        artist={song.artist.name}
        playcount={song.playcount}
        listeners={song.listeners}
      />
    ));
  } else {
    return songs.map((song) => (
      <SmallCard
        key={song.url}
        name={song.name}
        url={song.url}
        listeners={song.listeners}
      />
    ));
  }
}

export default MusicList;
