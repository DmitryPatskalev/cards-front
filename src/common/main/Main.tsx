import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../login/Login";
import { Stand } from "../superComponents/Stand";
import { Register } from "../register/Register";
import { Profile } from "../profile/Profile";
import Error404 from "../404/Error404";
import s from "./Main.module.scss";
import { PasswordRecovery } from "../password-recovery/PasswordRecovery";
import { NewPassword } from "../new-password/NewPassword";

export const Main = () => {
  return (
    <div className={s.main}>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"profile"} element={<Profile />} />
        <Route path={"*"} element={<Error404 />} />
        <Route path={"password-recovery"} element={<PasswordRecovery />} />
        <Route path={"new-password"} element={<NewPassword />} />
        <Route path={"stand"} element={<Stand />} />
      </Routes>
    </div>
  );
};
