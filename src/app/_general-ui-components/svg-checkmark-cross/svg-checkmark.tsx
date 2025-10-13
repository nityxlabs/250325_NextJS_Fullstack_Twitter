import * as React from "react";

import "./svg-checkmark.scss";

export default function SvgCheckMark({
  isVisible,
  strokeColor,
  extraCSSClasses = "",
  extraStyles = {},
  strokeWidth = 3,
  height = "20px",
  width = "20px",
}: {
  isVisible: boolean;
  strokeColor: string;
  extraCSSClasses?: string;
  extraStyles?: Record<string, any>;
  strokeWidth?: number;
  height?: string;
  width?: string;
}): React.JSX.Element {
  return (
    <div className={extraCSSClasses} style={{ height, width, ...extraStyles }}>
      <svg
        viewBox="0 0 20 20"
        className={`svg-checkmark ${isVisible ? "svg-checkmark--visible" : ""}`}
      >
        <path
          d="M3,10 L7,15 L17,4"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="22"
          strokeDashoffset="22"
        />
      </svg>
    </div>
  );
}
