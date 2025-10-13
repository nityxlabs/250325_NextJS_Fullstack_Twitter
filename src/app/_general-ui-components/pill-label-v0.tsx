// import * as React from 'react';

"use client";

/*
React Components: Pill
*/
const PillLabel = ({
  children,
  color,
  cssClasses = "",
  styles = {},
}: {
  children: any;
  color: string;
  cssClasses?: string;
  styles?: Record<string, any>;
}): React.JSX.Element => {
  const colorTable: Record<string, string> = {
    black2: "u-bg-black-2 u-fg-white",
    black3: "u-bg-black-3 u-fg-white",
    blueAzure: "u-bg-blue-azure u-fg-white",
    blueCarolina: "u-bg-carolina-blue u-fg-white",
    gray4: "u-bg-gray-4 u-fg-white",
    gray5: "u-bg-gray-5 u-fg-white",
    gray6: "u-bg-gray-6 u-fg-white",
    grayE: "u-bg-gray-e u-fg-black",
    greenForest: "u-bg-green-forest-crayola u-fg-white",
    greenPersian: "u-bg-green-persian u-fg-white",
    orange: "u-bg-orange-pantone u-fg-white",
    purple: "u-bg-purple-blue-violet u-fg-white",
    purpleRose: "u-bg-purple-rose u-fg-white",
    red: "u-bg-pink-winter-sky u-fg-white",
    white: "u-bg-white u-fg-black",
    yellow: "u-bg-yellow-amber u-fg-black",
  };

  return (
    <span
      className={`u-border-radius-sm u-pad-sm-x ${colorTable[color]} ${cssClasses}`}
      style={styles}
    >
      {children}
    </span>
  );
};

export default PillLabel;
