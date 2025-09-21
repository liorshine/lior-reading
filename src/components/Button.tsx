
"use client";

import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
}) => {
  const baseStyle =
    "inline-block px-8 py-4 font-semibold rounded-lg shadow-lg text-white transform transition-all duration-300 " +
    "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-101 hover:shadow-2xl";

  if (href) {
    return (
      <a href={href} className={`${baseStyle} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${className}`}>
      {children}
    </button>
  );
};
