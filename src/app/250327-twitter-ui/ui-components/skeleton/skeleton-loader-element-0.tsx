/*
Source - SASS Skeleton Loader: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/000000_PlaygroundReact/src/js/components/221019-skeleton-loader/skeleton-loader-component.tsx
Source - Styled Elements Skeleton Loader: /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/000000_CodeRepository/230103-skeleton-loader/skeleton-loader-1.tsx
*/

import "./skeleton-loader-element-0.scss";

export default function SkeletonLoaderElement({
  className = "",
  style = {},
}: {
  className?: string;
  style?: Record<string, any>;
}) {
  return (
    <div className={className} style={style}>
      <div className="c-skeleton-loader-element-0__loader"></div>
    </div>
  );
}
