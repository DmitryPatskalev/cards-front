import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./SuperButton.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type SuperButtonPropsType = DefaultButtonPropsType & { xType: string };

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps
}) => {
  const finalClassName =
    s.button +
    (xType === "default"
      ? " " + s.default
      : xType === "red"
      ? " " + s.red
      : xType === "disabled"
      ? " " + s.disabled
      : xType === "secondary"
      ? " " + s.secondary
      : "") +
    (className ? " " + className : "");

  return (
    <button disabled={disabled} className={finalClassName} {...restProps} />
  );
};
