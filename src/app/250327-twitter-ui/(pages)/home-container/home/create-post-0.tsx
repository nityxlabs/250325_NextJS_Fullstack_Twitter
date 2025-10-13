import { useContext, useRef, useState } from "react";

import Image from "next/image";

import { useMutation, useQueryClient } from "@tanstack/react-query";

// context providers
import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

// hooks
import useAuthGetMe from "@/app/250327-twitter-ui/hooks/use-auth-get-me";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

export default function CreatePost() {
  const { showToast } = useContext(ToastContext);

  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<any>(null);

  const imgRef = useRef<any>(null);

  const queryClient = useQueryClient();

  const { authenticatedUser } = useAuthGetMe();

  // TODO: testing
  // console.log("authenticatedUser: ", authenticatedUser);

  const {
    mutate: createPost,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({ text, img }: { text: string; img: any }) => {
      const createPostEndpoint = "/nodejs/api/posts/create";

      try {
        const response = await fetch(createPostEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
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
      setText("");
      setImg(null);
      showToast({
        message: "Post created successfully",
        success: true,
        visible: true,
      });
      // invalidate cached data to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      showToast({
        message: "Error creating post",
        success: false,
        visible: true,
      });
    },
  });

  // eslint-disable-next-line
  const data = {
    // profileImg: "/avatars/boy1.png",
    profileImg: "/public-250327-twitter-ui/shiny-charizard-icon.png",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert("Post created successfully");
    createPost({ text, img });
  };

  // TODO: I need to understand this function
  const handleImgChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };

      reader.onerror = () => {
        console.error("Error reading file: ", file.error);
      };

      reader.readAsDataURL(file);
    }
  };

  const showProfileImg =
    authenticatedUser?.data?.profileImg &&
    authenticatedUser.data.profileImg.length > 0
      ? authenticatedUser.data.profileImg
      : "/public-250327-twitter-ui/default-pokemon-icon.png";

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <Image
            alt="profile icon"
            src={showProfileImg}
            height={32}
            width={32}
          />
          <CiImageOn />
        </div>
      </div>

      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800 shadow-none"
          // style={{ boxShadow: "none" }}
          placeholder="What is happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <Image
              src={img}
              // className="w-full mx-auto h-72 object-contain rounded"
              alt="-"
              height={20}
              width={20}
            />
            {/* <img alt="uploaded image" src={img} /> */}
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input
            hidden
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">Something went wrong</div>}
      </form>
    </div>
  );
}
