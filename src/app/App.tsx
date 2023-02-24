import React from "react";
import s from "./App.module.scss";

import { NavBarComponent } from "../common/navbar/NavBarComponent";
import { Main } from "../common/main/Main";

function App() {
  return (
    <div className={s.app}>
      <NavBarComponent />
      <Main />
    </div>
  );
}

export default App;
