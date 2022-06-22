import { MyContext } from "../Context";
import { useContext } from "react";

function Aside() {
  const { setBoolMusic } = useContext(MyContext);

  const setTopMusicSettings = () => {
    setBoolMusic(true);
  };

  const setTopArtistsSettings = () => {
    setBoolMusic(false);
  };

  return (
    <aside className="side__menu">
      <ul className="menu__items">
        <li className="menu__link" onClick={() => setTopMusicSettings()}>
          Треки
        </li>
        <li className="menu__link" onClick={() => setTopArtistsSettings()}>
          Исполнители
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
