/*
Source:
- Source - Video: https://www.youtube.com/watch?v=4GUVz2psWUg @ 3:00:00
- Source - HTML page: https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md
*/

/*
Steps: Top Down

1. mobile
  1. make layout - DONE
  1. add header - HERE
  1. add input fields
  1. add signup button
  1. add "sign-in" area
  1. add logo
  1. remove larger logo from form
1. desktop 
  1. make layout
  1. see if responsive
  1. remove smaller logo over form in desktop view
*/

"use client";

// React icons
import { FaUser } from "react-icons/fa";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";

import XSvg from "@/app/250327-twitter-ui/assets/svgs/Xsvg.tsx";

import "./sign-up-1.scss";

export default function SignUp1(): React.JSX.Element {
  return (
    <section className="sign-up-1">
      <div className="container">
        <div className="large-logo">
          <XSvg className="fill-white" />
        </div>

        <div className="u-flex u-flex-col u-flex-grow-1 u-justify-content-center u-align-items-center">
          <form className="u-flex u-flex-col" style={{ gap: "12px" }}>
            <p className="u-text-dark-primary u-font-size-3xl u-font-weight-extra-bold">
              Join today.
            </p>

            <label className="signup-input">
              <MdOutlineMail />
              <input
                className="u-border-none u-ml-md"
                name="email"
                placeholder="Email"
                type="email"
              />
            </label>

            <label className="signup-input">
              <FaUser />
              <input
                className="u-border-none u-ml-md"
                name="username"
                placeholder="Username"
                type="text"
              />
            </label>

            <label className="signup-input">
              <MdDriveFileRenameOutline />
              <input
                className="u-border-none u-ml-md"
                name="fullName"
                placeholder="Full Name"
                type="text"
              />
            </label>

            <label className="signup-input">
              <MdPassword />
              <input
                className="u-border-none u-ml-md"
                name="password"
                placeholder="Password"
                type="password"
              />
            </label>

            <input
              className="button-pill button-pill--primary"
              type="submit"
              value="Sign Up"
            />

            <input
              className="btn rounded-full btn-primary text-white"
              type="submit"
            />

            <button
              className="button-pill button-pill--primary-outline"
              type="button"
            >
              Sign In - TEST
            </button>
          </form>
          <div className="u-flex u-flex-col">
            <button
              className="button-pill button-pill--primary-outline"
              type="button"
            >
              Sign In - why not full width
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
