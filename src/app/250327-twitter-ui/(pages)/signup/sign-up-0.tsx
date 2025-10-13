/*
Source:
- Source - Video: https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:00:00
- Source - HTML page: https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md
*/

"use client";

import Link from "next/link";
import { useState } from "react";

// React Icons
import { FaUser } from "react-icons/fa";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";
// import { MdPassword } from "react-icons/md";
// import { MdDriveFileRenameOutline } from "react-icons/md";

import XSvg from "@/app/250327-twitter-ui/assets/svgs/Xsvg.tsx";

export default function SignUp0(): React.JSX.Element {
  /*
  const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  */

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit = ", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target as HTMLInputElement;
    setFormData({ ...formData, [t.name]: t.value });
  };

  const isError = false;

  return (
    <div>
      <div className="max-w-screen-xl mx-auto flex h-screen px-10">
        <div className="flex-1 hidden lg:flex items-center justify-center">
          <XSvg className="lg:w-2/3 fill-white" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <form
            className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
            onSubmit={handleSubmit}
          >
            <XSvg className="w-24 lg:hidden fill-white" />
            <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>

            <label className="input input-bordered rounded flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>

            <label className="input input-bordered rounded flex items-center gap-2">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>

            <label className="input input-bordered rounded flex items-center gap-2">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>

            <button className="btn rounded-full btn-primary text-white">
              Sign up
            </button>
            {isError && <p className="text-red-500">Something went wrong</p>}
          </form>
          <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
            <p className="text-white text-lg">Already have an account?</p>
            <Link href="/250327-twitter-ui/login">
              <button className="btn rounded-full btn-primary text-white btn-outline w-full">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
