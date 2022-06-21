import MusicList from "./MusicList";
import ArtistList from "./ArtistList";
import { MyContext } from "../Context";
import { useContext } from "react";

function Content() {
  // eslint-disable-next-line no-unused-vars
  const { boolMusic, _, search, __ } = useContext(MyContext);
  return (
    <div className="cards__container">
      {boolMusic ? (
        <MusicList search={search} />
      ) : (
        <ArtistList search={search} />
      )}
    </div>
  );
}

export default Content;
