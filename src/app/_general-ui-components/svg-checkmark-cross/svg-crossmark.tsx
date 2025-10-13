import * as React from "react";

import "./svg-crossmark.scss";

export default function SvgCrossMark({
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
  // TODO: still need to fill this out - see file: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/220629_StyledComponents/src/js/experiments/play27-frontend-code-challenges/250306-form-validation-vanilla-js/exp4-svg-checkmark.html
  return (
    <div className={extraCSSClasses} style={{ height, width, ...extraStyles }}>
      <svg
        viewBox="0 0 20 20"
        className={`svg-crossmark ${isVisible ? "svg-crossmark--visible" : ""}`}
      >
        {/* <path
        d='M1,10 L5,15 L15,4'
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray='22'
        strokeDashoffset='22'
      /> */}
        <path
          className="cross-1"
          d="M3,3 L18,18"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="22"
          strokeDashoffset="22"
        />
        <path
          className="cross-2"
          d="M18,3 L3,18"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="22"
          strokeDashoffset="22"
        />
      </svg>
    </div>
  );
}
