"use client";

import { useState } from "react";

// import Posts from "../../components/common/Posts";
import CreatePost from "./create-post-0";
import Posts from "@/app/250327-twitter-ui/ui-components/common/posts-0";

import { FeedTypeEnum } from "@/app/250327-twitter-ui/types";

export default function HomePage() {
  const [feedType, setFeedType] = useState(FeedTypeEnum.forYou);

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      <div className="flex w-full border-b border-gray-700">
        <div
          className={
            "flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          }
          onClick={() => setFeedType(FeedTypeEnum.forYou)}
        >
          For you
          {feedType === FeedTypeEnum.forYou && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType(FeedTypeEnum.following)}
        >
          Following
          {feedType === FeedTypeEnum.following && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>

      <CreatePost />

      {/* NOTE: since feedType can only be `forYou` or `following`, we do not to pass username or userId */}
      <Posts feedType={feedType} />
    </div>
  );
}

/*

import { useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				* // Header
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>

				* //  CREATE POST INPUT
				<CreatePost />

				* // POSTS
				<Posts />
			</div>
		</>
	);
};
export default HomePage;
*/
