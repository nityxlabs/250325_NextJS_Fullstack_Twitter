import SvgCheckMark from "./svg-checkmark";
import SvgCrossMark from "./svg-crossmark";

export default function ShowCheckMarkOrCrossMark({
  isError,
}: {
  isError: boolean;
}) {
  // TODO: need to fix this so these components do not take up space

  const height = "16px";
  const width = "16px";

  return (
    // <div className="u-pos-relative" style={{ height: "20px", width: "20px" }}>
    <div className="u-pos-relative" style={{ marginRight: "20px" }}>
      <SvgCrossMark
        extraCSSClasses="u-pos-absolute"
        isVisible={isError}
        height={height}
        strokeColor="#ca1551"
        width={width}
      />

      <SvgCheckMark
        extraCSSClasses="u-pos-absolute"
        isVisible={!isError}
        height={height}
        strokeColor="#4cb944"
        width={width}
      />
    </div>
  );
}
