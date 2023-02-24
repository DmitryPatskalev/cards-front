import React from "react";
import s from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

export const NavBarComponent = () => {
  return (
    <div className={s.navbar}>
      <NavLink to={"login"}>Login</NavLink>
      <NavLink to={"register"}>Registration</NavLink>
      <NavLink to={"profile"}>Profile</NavLink>
      <NavLink to={"*"}>404</NavLink>
      <NavLink to={"password-recovery"}>Password recovery</NavLink>
      <NavLink to={"new-password"}>New Password</NavLink>
      <NavLink to={"stand"}>Stand</NavLink>
    </div>
  );
};
