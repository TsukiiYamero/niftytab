import "./customButton.css";
import { FC, MouseEvent, ReactNode } from "react";
import { BtnSizes, BtnSpace, BtnStyles } from "./customButton.types";
import { createRipple } from "@/utils";

export interface Props {
  onClick: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => any;
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  id?: string;
  className?: string;
  buttonStyle?: BtnStyles;
  buttonSize?: BtnSizes;
  buttonSpace?: BtnSpace;
  disabled?: boolean;
}

/**
 * A basic button that contain a ripple effect,
 * @param `Props`
 * @returns custom `HTMLButtonElement`
 */
export const CustomButton: FC<Props> = ({
  onClick,
  children,
  className = "",
  type = "button",
  buttonStyle = "btn-primary",
  buttonSize = "btn-xs",
  buttonSpace = "btn-cmn-p",
  disabled = false,
  id = "",
}) => {
  return (
    <button
      onClick={(ev) => {
        createRipple(ev);
        onClick(ev);
      }}
      type={type}
      className={`common-btn ${buttonStyle} ${buttonSize} ${buttonSpace} ${className}`}
      id={id}
      disabled={disabled}
    >
      {children}
    </button>
  );
};