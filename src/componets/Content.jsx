import MusicList from "./MusicList";
import ArtistList from "./ArtistList";
import { MyContext } from "../Context";
import { useContext } from "react";

function Content() {
  const { boolMusic, search } = useContext(MyContext);
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
