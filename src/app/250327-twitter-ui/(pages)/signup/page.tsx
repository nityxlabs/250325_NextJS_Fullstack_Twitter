"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SignUp0 from "./sign-up-0";
import SignUp0A from "./sign-up-0a";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SignUp1 from "./sign-up-1";

export default function SignUpPage(): React.JSX.Element {
  // return <SignUp0 />;
  return <SignUp0A />;
  // return <SignUp1 />;
}

/*
* Source: <https://github.com/burakorkmez/twitter-clone/blob/master/UI-DESIGN-STEPS.md>
? Q: things I learned
? - margin-inline
? - padding-inline
? - fill: white (for SVG)
? - touch-action: manipulation | auto | pan-x | pan-y | 
? - color-mix(in lch, green 50%, white);
? - color-mix(in srgb, red 40%, blue);
? - :where() -> has CSS specificity = 0, therefore easy to override style later. Example: `:where(form input[type="text"])`
? - vertical-align: middle | baseline | ....;
? - outline-offset
? - :where(&) {
    width: unset;
  }
? - pointer-events: none
? - user-select: none;
	- In CSS, user-select controls whether text (or other user-selectable content) can be selected by the user — like when you click and drag to highlight text.
? - width: unset;
	- In CSS, width: unset removes any previously set width and resets it to the default behavior, depending on how the property is inherited or not.
	Example: 
	.card {
		width: 300px;
	}
	.card.fullscreen {
		* // removes fixed width, goes back to normal flow
		width: unset;
	}

? - @media (hover: hover)
	- Use cases:
		- Add hover effects only on devices where hover makes sense (e.g., desktop)
		- Avoid hover styles triggering awkwardly on touchscreens (e.g., mobile devices)
	- Example:
	
	.button {
		background: gray;
	}

	* // Only apply on hover-capable devices (e.g., desktop)
	@media (hover: hover) {
		.button:hover {
			background: blue;
		}
	}

? - &:not( .btn-active, :hover, :active:focus, :focus-visible, :disabled, [disabled], .btn-disabled, :checked )
? - &:active:not(.btn-active)
? - &:is(input[type="checkbox"], input[type="radio"])
? - &:where(input:checked:not(.filter .btn))
? - color-mix(in oklab
? - border-radius: calc(infinity * 1px)
? - padding-inline
? - isolation: isolate;
? - &:hover:not( .btn-active, :active, :focus-visible, :disabled, [disabled], .btn-disabled, :checked )
? - CSS variables (CSS custom properties) when 2 or more utility classes have value assigned to that variable



--------- Actual Code Below
---------

import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
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

	const isError = false;

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className=' lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						! // BOOKMARK
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
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
					<button className='btn rounded-full btn-primary text-white'>Sign up</button>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
*/
