import React, { type ReactNode } from "react";
import { type ButtonProps } from "./types";

interface HeaderRightButtonProps extends ButtonProps {
  buttonName: string;
  onToggleButton?: (name: string) => void;
  buttonContent: {
    img: ReactNode;
    text: ReactNode;
  };
}

export const HeaderRightButton: React.FC<HeaderRightButtonProps> = ({
  buttonName,
  onToggleButton,
  buttonContent,
  className = "",
}) => {
  const handleClick = () => {
    if (onToggleButton) {
      onToggleButton(buttonName);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full h-10 items-center gap-1.5 px-0.5 text-[#00136b] hover:bg-[#2f71cd] hover:text-white ${className}`}
    >
      <div className="w-6 h-6 md:w-7 md:h-7">{buttonContent.img}</div>
      <h3 className="font-verdana font-semibold text-[0.65rem] md:text-[0.7rem]">
        <span style={{ verticalAlign: "inherit" }}>
          <span style={{ verticalAlign: "inherit" }}>{buttonContent.text}</span>
        </span>
      </h3>
    </button>
  );
};

export default HeaderRightButton;
