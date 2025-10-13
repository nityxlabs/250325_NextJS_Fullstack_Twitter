import SkeletonLoaderElement from "./skeleton-loader-element-0";

export function PostSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-2 w-12 rounded-full"></div>
          <div className="skeleton h-2 w-24 rounded-full"></div>
        </div>
      </div>
      <div className="skeleton h-40 w-full"></div>
    </div>
  );
}

export function PostSkeletonMokha() {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="flex gap-2 items-center">
        <SkeletonLoaderElement className="bg-[#333] h-10 w-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2">
          <SkeletonLoaderElement className="bg-[#333] h-2 w-12 rounded-full" />
          <SkeletonLoaderElement className="bg-[#333] h-2 w-24 rounded-full" />
        </div>
      </div>
      <SkeletonLoaderElement className="bg-[#333] h-40 w-full" />
    </div>
  );
}
