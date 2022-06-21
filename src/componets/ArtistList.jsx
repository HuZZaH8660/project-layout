import { useEffect, useState } from "react";
import MediumCard from "./MediumCard";
import SmallCard from "./SmallCard";

function ArtistList(props) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const INITURL = process.env.REACT_APP_API_URL;
    const INITKEY = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      const reply =
        props.search === ""
          ? await fetch(
              `${INITURL}?method=chart.gettopartists&api_key=${INITKEY}&format=json`
            )
          : await fetch(
              `${INITURL}?method=artist.search&limit=25&artist=${props.search}&api_key=${INITKEY}&format=json`
            );
      const data = await reply.json();
      const foundArtists = data.results
        ? data.results.artistmatches
        : data.artists;
      setArtists(foundArtists.artist);
    };
    fetchData();
  }, [props.search]);

  if (props.search === "") {
    return artists.map((artist) => (
      <MediumCard
        key={artist.url}
        name={artist.name}
        url={artist.url}
        playcount={artist.playcount}
        listeners={artist.listeners}
      />
    ));
  } else {
    return artists.map((artist) => (
      <SmallCard
        key={artist.url}
        name={artist.name}
        url={artist.url}
        listeners={artist.listeners}
      />
    ));
  }
}

export default ArtistList;
