import React, { useState } from "react";
import Footer from "./componets/Footer";
import Header from "./componets/Header";
import Aside from "./componets/Aside";
import Main from "./componets/Main";
import { MyContext } from "./Context";

function App() {
  const [boolMusic, setBoolMusic] = useState(true);
  const [search, setSearch] = useState("");
  const providerValue = React.useMemo(
    () => ({
      boolMusic,
      setBoolMusic,
      search,
      setSearch,
    }),
    [boolMusic, search]
  );

  return (
    <div className="app">
      <MyContext.Provider value={providerValue}>
        <Header />
        <Aside />
        <Main key={boolMusic} />
      </MyContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
