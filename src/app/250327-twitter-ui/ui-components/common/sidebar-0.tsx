"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
// custom hooks
import useAuthGetMe from "@/app/250327-twitter-ui/hooks/use-auth-get-me";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

import XSvg from "@/app/250327-twitter-ui/assets/svgs/Xsvg";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const HREF_PREFIX = "/250327-twitter-ui/home-container";

export default function Sidebar(): React.ReactNode {
  const { showToast } = useContext(ToastContext);

  const router = useRouter();

  const queryClient = useQueryClient();

  // get user authenticate data
  const {
    authenticatedUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authenticatedUserIsError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authenticatedUserError,
  } = useAuthGetMe();

  const {
    mutate: logoutMutation,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isPending,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
  } = useMutation({
    mutationFn: async () => {
      // SignUp API: NodeJS Route
      const apiRouteLogout = "/nodejs/api/auth/logout";
      // SignUp API: NextJS Rote
      // const apiRouteLogout = "/250327-twitter-ui/signup/api";

      try {
        const response = await fetch(apiRouteLogout, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Logout successful",
        success: true,
        visible: true,
      });

      // invalidate authenticated user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // redirect to login page after logging out - this is why I do not use `useMutateEntity` hook here
      router.replace("/250327-twitter-ui/login");
    },
    onError: (error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <section className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link href="/" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>

        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              href={`${HREF_PREFIX}/home`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="h-8 w-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              href={`${HREF_PREFIX}/notifications`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="h-6 w-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              href={`${HREF_PREFIX}/profile/${authenticatedUser?.data?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="h-6 w-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authenticatedUser && (
          <Link
            href={`${HREF_PREFIX}/profile/${authenticatedUser?.data?.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] px-4 py-2 rounded-full"
          >
            <article className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                {/* <img
                  alt="profile image"
                  src={
                    authenticatedUser?.data?.profileImg ||
                    "/public-250327-twitter-ui/shiny-charizard-icon.png"
                  }
                /> */}
                <Image
                  alt="profile image"
                  src={
                    authenticatedUser?.data?.profileImg ||
                    "/public-250327-twitter-ui/shiny-charizard-icon.png"
                  }
                  height={32}
                  width={32}
                />
              </div>
            </article>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {authenticatedUser?.data?.fullName}
                </p>
                <p className="text-slate-500 text-sm">
                  @{authenticatedUser?.data?.username}
                </p>
              </div>
              <BiLogOut
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  // NOTE: need `e.preventDefault()` as this is nested in a <Link> component
                  e.preventDefault();
                  logoutMutation();
                }}
              />
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}

/*
import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
	const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	};

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile/${data?.username}`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
        ! EKHANE 25.7.30 - Need to write up this part of file
				{data && (
					<Link
						to={`/profile/${data.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{data?.username}</p>
							</div>
							<BiLogOut className='w-5 h-5 cursor-pointer' />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;
*/
