import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

// hooks
import useAuthGetMe from "@/app/250327-twitter-ui/hooks/use-auth-get-me";
import useFollow from "@/app/250327-twitter-ui/hooks/use-follow";
import useUpdateProfile from "@/app/250327-twitter-ui/hooks/use-update-profile";

// UI components
import Posts from "@/app/250327-twitter-ui/ui-components/common/posts-0";
// TODO: need to make files below & import
import EditProfileModal from "./edit-profile-modal-0";
import { ProfileHeaderSkeleton } from "@/app/250327-twitter-ui/ui-components/skeleton/profile-header-skeleton-0";
import LoadingSpinner from "@/app/250327-twitter-ui/ui-components/common/loading-spinner-0";

// React Icons
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

// data
import { POSTS } from "@/app/250327-twitter-ui/data/dummy";

// utils
import { formatMemberSinceDate } from "@/app/250327-twitter-ui/utils/date/utils";

import { FeedTypeEnum } from "@/app/250327-twitter-ui/types";

export default function ProfilePage({
  username,
}: {
  username: string;
}): React.JSX.Element {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState(FeedTypeEnum.userPosts);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { authenticatedUser } = useAuthGetMe();
  const { followUser, followUserIsPending } = useFollow();
  const { updateProfileAsync, updateProfileIsPending } = useUpdateProfile();

  const {
    data: userProfileData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: userProfileDataIsError,
    isLoading: userProfileDataIsLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: userProfileDataError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await fetch(`/nodejs/api/users/profile/${username}`);

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  const isMyProfile = authenticatedUser?.data?._id === userProfileData?._id;
  const amIFollowing = authenticatedUser?.data?.following.includes(
    userProfileData?._id
  );
  const memberSinceDate = formatMemberSinceDate(userProfileData?.createdAt);

  // const user = {
  //   _id: "1",
  //   fullName: "John Doe",
  //   username: "johndoe",
  //   profileImg: "/public-250327-twitter-ui/avatars/boy2.png",
  //   coverImg: "/public-250327-twitter-ui/cover.jpg",
  //   bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   link: "https://youtube.com/@asaprogrammer_",
  //   following: ["1", "2", "3"],
  //   followers: ["1", "2", "3"],
  // };

  const handleImgChange = (e: any, state: any) => {
    // handles updating image file to state
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // TODO - Q: I'm not sure what is a better approach for `reader.onload`
      // reader.onload = () => {
      //   state === "coverImg" && setCoverImg(reader.result);
      //   state === "profileImg" && setProfileImg(reader.result);
      // };
      reader.onload = () => {
        if (state === "coverImg") {
          setCoverImg(reader.result as any);
        }
        if (state === "profileImg") {
          setProfileImg(reader.result as any);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    // do not update if call is currently pending
    if (updateProfileIsPending) {
      return;
    }

    await updateProfileAsync({
      coverImg,
      profileImg,
    });
    // clears these React states so "update" button can disappear
    setCoverImg(null);
    setProfileImg(null);
  };

  return (
    <>
      <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen ">
        {/* HEADER */}
        {userProfileDataIsLoading && <ProfileHeaderSkeleton />}
        {!userProfileDataIsLoading && !userProfileData && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!userProfileDataIsLoading && userProfileData && (
            <>
              <div className="flex gap-10 px-4 py-2 items-center">
                <Link href="/">
                  <FaArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                  <p className="font-bold text-lg">
                    {userProfileData?.fullName}
                  </p>
                  <span className="text-sm text-slate-500">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>

              {/* COVER IMG */}
              <div className="relative group/cover">
                {/* <img
                  src={
                    coverImg ||
                    userProfileData?.coverImg ||
                    "/public-250327-twitter-ui/cover.jpg"
                  }
                  className="h-52 w-full object-cover"
                  alt="cover image"
                /> */}
                <Image
                  alt="cover image"
                  className="h-52 w-full object-cover"
                  src={
                    coverImg ||
                    userProfileData?.coverImg ||
                    "/public-250327-twitter-ui/cover.jpg"
                  }
                  // fill
                  height={208}
                  width={1200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {isMyProfile && (
                  <div
                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                    onClick={() => (coverImgRef.current as any).click()}
                  >
                    <MdEdit className="w-5 h-5 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />

                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                  <div className="w-32 rounded-full relative group/avatar">
                    {/* <img
                      src={
                        profileImg ||
                        userProfileData?.profileImg ||
                        "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                      }
                      alt="profile image"
                    /> */}
                    <Image
                      alt="avatar"
                      src={
                        profileImg ||
                        userProfileData?.profileImg ||
                        "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                      }
                      fill
                    />
                    <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="w-4 h-4 text-white"
                          onClick={() => (profileImgRef.current as any).click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-5">
                {isMyProfile && <EditProfileModal />}
                {!isMyProfile && (
                  <button
                    className="btn btn-outline rounded-full btn-sm"
                    onClick={() => followUser(userProfileData._id)}
                  >
                    {followUserIsPending && <LoadingSpinner size="sm" />}
                    {!followUserIsPending &&
                      (amIFollowing ? "Unfollow" : "Follow")}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                    onClick={handleUpdateProfile}
                  >
                    {updateProfileIsPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Update"
                    )}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-14 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">
                    {userProfileData?.fullName}
                  </span>
                  <span className="text-sm text-slate-500">
                    @{userProfileData?.username}
                  </span>
                  <span className="text-sm my-1">{userProfileData?.bio}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {userProfileData?.link && (
                    <div className="flex gap-1 items-center ">
                      <>
                        <FaLink className="w-3 h-3 text-slate-500" />
                        <a
                          href="https://youtube.com/@asaprogrammer_"
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          youtube.com/@asaprogrammer_
                        </a>
                      </>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {memberSinceDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {userProfileData?.following.length}
                    </span>
                    <span className="text-slate-500 text-xs">Following</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {userProfileData?.followers.length}
                    </span>
                    <span className="text-slate-500 text-xs">Followers</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full border-b border-gray-700 mt-4">
                <div
                  className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType(FeedTypeEnum.userPosts)}
                >
                  Posts
                  {feedType === FeedTypeEnum.userPosts && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <div
                  className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType(FeedTypeEnum.userLikes)}
                >
                  Likes
                  {feedType === FeedTypeEnum.userLikes && (
                    <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </>
          )}

          {userProfileDataIsLoading && <LoadingSpinner size="lg" />}
          {!userProfileDataIsLoading && (
            <Posts
              feedType={feedType}
              username={userProfileData?.username}
              userId={userProfileData?._id}
            />
          )}
        </div>
      </div>
    </>
  );
}
