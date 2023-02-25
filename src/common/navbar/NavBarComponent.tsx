import React from "react";
import s from "./NavBar.module.scss";
import TestComponent from "../TestComponent";

export const NavBarComponent = () => {
  return (
    <div className={s.navbar}>
      <TestComponent />
    </div>
  );
};
