import SkeletonLoaderElement from "./skeleton-loader-element-0";

export function RightPanelSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 w-52 my-2">
      <div className="flex gap-2 items-center">
        {/* NOTE: I think this is the circle for the avatar */}
        <div className="skeleton bg-[#333] h-8 w-8 rounded-full shrink-0"></div>
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1">
            <div className="skeleton bg-[#333] h-2 w-12 rounded-full"></div>
            <div className="skeleton bg-[#333] h-2 w-16 rounded-full"></div>
          </div>
          <div className="skeleton bg-[#333] h-6 w-14 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function RightPanelSkeletonMokha(): React.JSX.Element {
  // NOTE: this is the same as `<RightPanelSkeleton>`, but I'm using my own skeleton loader
  return (
    <div className="flex flex-col gap-2 w-52 my-2">
      <div className="flex gap-2 items-center">
        {/* NOTE: I think this is the circle for the avatar */}
        <SkeletonLoaderElement className="bg-[#333] h-8 w-8 rounded-full shrink-0" />
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1">
            <SkeletonLoaderElement className="bg-[#333] h-2 w-12 rounded-full" />
            <SkeletonLoaderElement className="bg-[#333] h-2 w-16 rounded-full" />
          </div>
          <SkeletonLoaderElement className="bg-[#333] h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/*
const RightPanelSkeleton = () => {
	return (
		<div className='flex flex-col gap-2 w-52 my-2'>
			<div className='flex gap-2 items-center'>
				<div className='skeleton w-8 h-8 rounded-full shrink-0'></div>
				<div className='flex flex-1 justify-between'>
					<div className='flex flex-col gap-1'>
						<div className='skeleton h-2 w-12 rounded-full'></div>
						<div className='skeleton h-2 w-16 rounded-full'></div>
					</div>
					<div className='skeleton h-6 w-14 rounded-full'></div>
				</div>
			</div>
		</div>
	);
};
export default RightPanelSkeleton;
*/
