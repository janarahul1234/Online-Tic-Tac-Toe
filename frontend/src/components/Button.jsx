import React from "react";

const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const buttonStyles = {
  [BUTTON_TYPES.PRIMARY]: "w-full bg-blue-500 hover:bg-blue-600 ",
  [BUTTON_TYPES.SECONDARY]:
    "w-[148px] flex-row-reverse border border-gray-800 hover:bg-gray-800/50",
};

const Button = ({
  icon,
  label,
  type = "button",
  style = BUTTON_TYPES.PRIMARY,
  onClick = () => {},
}) => {
  const ButtonIcon = icon;

  return (
    <button
      type={type}
      className={`${buttonStyles[style]} text-white px-4 py-2 flex items-center justify-center gap-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      onClick={onClick}
    >
      {label}
      <ButtonIcon size={20} />
    </button>
  );
};

Button.TYPES = BUTTON_TYPES;
export default Button;
