
"use client";

import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  disabled = false, // default
}) => {
  const baseStyle =
    "inline-block px-8 py-4 font-semibold rounded-lg shadow-lg text-white transform transition-all duration-300 " +
    "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-101 hover:shadow-2xl";

  const disabledStyle =
    "bg-gray-400 cursor-not-allowed hover:scale-100 hover:shadow-none";

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={`${baseStyle} ${disabled ? disabledStyle : ""} ${className}`}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyle} ${disabled ? disabledStyle : ""} ${className}`}
    >
      {children}
    </button>
  );
};
