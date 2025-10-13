"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

// React icons
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import XSvg from "@/app/250327-twitter-ui/assets/svgs/Xsvg";

export default function LoginPage() {
  const router = useRouter();
  // Access the client
  const queryClient = useQueryClient();

  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    username: "Poliwag",
    password: "abc123",
  });

  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      // SignUp API: NodeJS Route
      const apiRouteLogin = "/nodejs/api/auth/login";
      // SignUp API: NextJS Rote
      // const apiRouteLogin = "/250327-twitter-ui/login/api";

      try {
        const response = await fetch(apiRouteLogin, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: any) {
        console.error(error);
        // MK-CONJ: I think this passes the error message to `error` in `useMutation`
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Login successful",
        success: true,
        visible: true,
      });

      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      router.push("/250327-twitter-ui/home-container/home");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loginMutation(formData);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const t = e.target as HTMLInputElement;
    setFormData({ ...formData, [t.name]: t.value });
  }

  async function testGetMe() {
    // SignUp API: NodeJS Route
    const apiRouteGetMe = "/nodejs/api/auth/me";

    try {
      const response = await fetch(apiRouteGetMe);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log("testGetMe success!: data = ", data);
    } catch (error: any) {
      console.error("testGetMe: error = ", error);
    }
  }

  return (
    <div className="h-screen w-full">
      <section className="h-screen max-w-screen-xl flex mx-auto">
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <XSvg className="lg:w-2/3 fill-white" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <form
            className="lg:w-2/3 md:mx-20 flex gap-4 flex-col mx-auto"
            onSubmit={handleSubmit}
          >
            <XSvg className="w-24 lg:hidden fill-white" />
            <h1 className="text-4xl font-extrabold text-white">
              {"Let's"} go.
            </h1>

            <label className="c-signup-input flex items-center justify-center border-2 gap-2 border-gray-300 rounded-lg p-3">
              <MdOutlineMail />
              <input
                name="username"
                placeholder="Username"
                type="text"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>

            <label className="c-signup-input flex items-center justify-center border-2 gap-2 border-gray-300 rounded-lg p-3">
              <MdPassword />
              <input
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>

            <button className="flex items-center justify-center bg-blue-600 cursor-pointer rounded-full px-4 py-3 shadow text-white">
              {isPending ? "Loading..." : "Sign In"}
            </button>
            {isError && <p className="text-red-500">{error.message}</p>}

            <p className="text-sm text-white">Already have an account?</p>
            <Link
              href="/250327-twitter-ui/signup"
              className="c-sign-in-btn flex items-center justify-center bg-transparent border-3 border-blue-600 cursor-pointer rounded-full px-4 py-3 shadow text-white"
            >
              Sign Up
            </Link>

            <aside
              className="btn btn-secondary rounded-full text-white p-4"
              onClick={testGetMe}
            >
              Test Get Me
            </aside>
          </form>
        </div>
      </section>
    </div>
  );
}

/*
* Source of file: https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md

import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const isError = false;

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>Login</button>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
*/
