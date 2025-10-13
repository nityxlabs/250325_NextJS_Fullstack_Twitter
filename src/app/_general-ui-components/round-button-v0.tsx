// import * as React from 'react';
// import { useRef, useState } from 'react';
"use client";

type GeneralFunctionType = (...args: any) => any;

const RoundButton = ({
  color,
  cssClasses = "",
  handleClick,
  children,
}: {
  color: string;
  cssClasses?: string;
  handleClick: GeneralFunctionType | any;
  children: number | string | any;
}): React.JSX.Element => {
  const colorTable: Record<string, string> = {
    amber500: "bg-amber-500 text-black",
    amber600: "bg-amber-600 text-black",
    amber700: "bg-amber-700 text-white",
    amber800: "bg-amber-800 text-white",
    amber900: "bg-amber-900 text-white",
    blue500: "bg-blue-500 text-white",
    blue700: "bg-blue-700 text-white",
    gray100: "bg-gray-100 text-black",
    gray400: "bg-gray-400 text-white",
    gray600: "bg-gray-600 text-white",
    gray700: "bg-gray-700 text-white",
    gray800: "bg-gray-800 text-white",
    gray900: "bg-gray-900 text-white",
    green500: "bg-green-500 text-white",
    green600: "bg-green-600 text-white",
    green700: "bg-green-700 text-white",
    green800: "bg-green-800 text-white",
    pink600: "bg-pink-600 text-white",
    pink700: "bg-pink-700 text-white",
    pink800: "bg-pink-800 text-white",
    purple500: "bg-purple-500 text-white",
    purple600: "bg-purple-600 text-white",
    purple700: "bg-purple-700 text-white",
    red600: "bg-red-600 text-white",
    red700: "bg-red-700 text-white",
    red800: "bg-red-800 text-white",
  };

  return (
    <button
      className={`border-0 rounded-md p-2 cursor-pointer ${colorTable[color]} ${cssClasses}`}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default RoundButton;
