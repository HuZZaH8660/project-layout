import { MyContext } from "../Context";
import { useContext } from "react";

function Header() {
  const { setSearch } = useContext(MyContext);

  const setSearchConst = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  return (
    <header className="header">
      <a href="index.html">
        <img className="spotify__logo" src="./spotify.png" alt="Spotify" />
      </a>
      <input
        className="header__search"
        onKeyPress={setSearchConst}
        placeholder="Исполнитель или трек"
      />
    </header>
  );
}

export default Header;
