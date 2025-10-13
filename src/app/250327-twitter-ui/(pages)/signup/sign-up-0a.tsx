/*
Source:
- Source - Video: https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:00:00
- Source - HTML page: https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md
*/

"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

// React Icons
import { FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";

// UI Components
import XSvg from "@/app/250327-twitter-ui/assets/svgs/Xsvg";

import "./sign-up-0a.scss";

export default function SignUp0A(): React.JSX.Element {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    email: "magikarp@pokemon.com",
    username: "magikarp",
    fullName: "magikarp",
    password: "abc123",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    mutate: signUpMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({
      email,
      username,
      fullName,
      password,
    }: {
      email: string;
      username: string;
      fullName: string;
      password: string;
    }) => {
      // SignUp API: NodeJS Route
      // const apiRouteSignupFullNodeJSPath = "http://localhost:8000/nodejs/api/auth/signup";
      const apiRouteSignup = "/nodejs/api/auth/signup";
      // SignUp API: NextJS Rote
      // const apiRouteSignup = "/250327-twitter-ui/signup/api";

      try {
        const response = await fetch(apiRouteSignup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error);
        }

        // TODO: testing
        console.log("mutationFn success - data = ", data);

        return data;
      } catch (error: any) {
        console.error(error);
        // NOTE: I think this passes the error message to `error` in `useMutation`
        throw new Error(error.message); // throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Account created successfully",
        success: true,
        visible: true,
      });

      setTimeout(() => {
        router.replace("/250327-twitter-ui/login");
      }, 1000);
    },
    onError: (error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit = ", formData);

    signUpMutation(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target as HTMLInputElement;
    setFormData({ ...formData, [t.name]: t.value });
  };

  const testPath = async () => {
    // NOTE: this is the absolute backend path
    // const apiRouteTest = "http://localhost:8000/nodejs/api/auth/test";
    // NOTE: this is the same as above, but the `rewrites()` is defined in `next.config.ts`
    const apiRouteTest = "/nodejs/api/auth/test";

    try {
      const response = await fetch(apiRouteTest);

      // TODO: testing
      console.log("testPath(): response = ", response);

      if (!response.ok) {
        throw new Error("testPath");
      }

      const data = await response.json();

      // TODO: testing
      console.log("testPath(): data = ", data);
    } catch (error: any) {
      console.warn("testPath: error = ", error);
    }
  };

  // const isError = false;

  return (
    <section className="file-sign-up-0a">
      <div className="h-screen max-w-screen-xl flex mx-auto px-10">
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <XSvg className="lg:w-2/3 fill-white" />
        </div>

        <section className="flex-1 flex flex-col justify-center items-center">
          <form
            className="lg:w-2/3 md:mx-20 flex gap-4 flex-col mx-auto"
            onSubmit={handleSubmit}
          >
            <XSvg className="w-24 lg:hidden fill-white" />
            <h1 className="text-4xl font-extrabold text-white">Join today.</h1>

            <label className="c-signup-input flex items-center justify-center border-2 gap-2 border-gray-400 rounded-lg p-3">
              <MdOutlineMail />
              <input
                name="email"
                placeholder="Email"
                type="text"
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>

            <div className="group-inputs">
              <label className="c-signup-input flex flex-1 items-center justify-center gap-2 border-2 border-gray-400 rounded-lg p-3">
                <FaUser />
                <input
                  name="username"
                  placeholder="Username"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </label>

              <label className="c-signup-input flex flex-1 items-center justify-center gap-2 border-2 border-gray-400 rounded-lg p-3">
                <MdDriveFileRenameOutline />
                <input
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </label>
            </div>

            <label className="c-signup-input flex items-center justify-center border-2 gap-2 border-gray-400 rounded-lg p-3">
              <MdPassword />
              <input
                name="password"
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={handleInputChange}
                value={formData.password}
              />
              {isPasswordVisible && (
                <FaRegEye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
              {!isPasswordVisible && (
                <FaRegEyeSlash
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </label>

            <button className="flex items-center justify-center bg-blue-600 cursor-pointer rounded-full px-4 py-3 shadow text-white">
              {isPending ? "Loading..." : "Sign up"}
            </button>
            {isError && <p className="text-red-500">{error.message}</p>}

            <p className="text-sm text-white">Already have an account?</p>
            <Link
              href="/250327-twitter-ui/login"
              className="c-sign-in-btn flex items-center justify-center bg-transparent border-3 border-blue-600 cursor-pointer rounded-full px-4 py-3 shadow text-white"
            >
              Sign In
            </Link>

            <aside
              className="btn btn-primary rounded-full text-white p-4"
              onClick={testPath}
            >
              /test path
            </aside>

            <aside
              className="btn btn-secondary rounded-full text-white p-4"
              onClick={() =>
                showToast({
                  message: "test toast message v0",
                  visible: true,
                  success: true,
                })
              }
            >
              Test Toast
            </aside>
          </form>
        </section>
      </div>
    </section>
  );
}
