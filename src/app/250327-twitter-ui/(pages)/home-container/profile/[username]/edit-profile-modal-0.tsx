import { useEffect, useState } from "react";

// hooks
import useUpdateProfile from "@/app/250327-twitter-ui/hooks/use-update-profile";
import useAuthGetMe from "@/app/250327-twitter-ui/hooks/use-auth-get-me";

import LoadingSpinner from "@/app/250327-twitter-ui/ui-components/common/loading-spinner-0";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function EditProfileModal(): React.JSX.Element {
  const [formData, setFormData] = useState({
    bio: "",
    currentPassword: "",
    email: "",
    fullName: "",
    link: "",
    newPassword: "",
    username: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const { authenticatedUser } = useAuthGetMe();
  const { updateProfile, updateProfileIsPending } = useUpdateProfile();

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    const {
      bio,
      currentPassword,
      email,
      fullName,
      link,
      newPassword,
      username,
    } = formData;

    const response = await updateProfile({
      bio,
      currentPassword,
      email,
      fullName,
      link,
      newPassword,
      username,
    });

    // TODO: testing
    console.log("Response = ", response);
  };

  useEffect(() => {
    setFormData({
      bio: authenticatedUser?.data?.bio ?? "",
      currentPassword: authenticatedUser?.data?.currentPassword ?? "",
      email: authenticatedUser?.data?.email ?? "",
      fullName: authenticatedUser?.data?.fullName ?? "",
      link: authenticatedUser?.data?.link ?? "",
      newPassword: authenticatedUser?.data?.newPassword ?? "",
      username: authenticatedUser?.data?.username ?? "",
    });
  }, [authenticatedUser]);

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          (document as any).getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProfile();
            }}
          >
            {/* Form-like area that has input fields that allows me to update field */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
                // * NOTE: I disabled this field because when I can the username, it affects the endpoint '/nodejs/api/users/profile/${username}'
                disabled
              />
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2">
              <article className="input flex justify-between flex-1 border border-gray-700 rounded p-2 input-md">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Current Password"
                  className="border-0"
                  value={formData.currentPassword}
                  name="currentPassword"
                  onChange={handleInputChange}
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
              </article>
              <article className="input flex justify-between flex-1 border border-gray-700 rounded p-2 input-md">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="New Password"
                  className="border-0"
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
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
              </article>
            </div>
            <input
              type="text"
              placeholder="Link"
              // className="flex-1 input border border-gray-700 rounded p-2 input-md"
              className="w-full input border border-gray-700 rounded p-2"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button className="btn btn-primary rounded-full btn-sm text-white">
              {updateProfileIsPending ? <LoadingSpinner size="sm" /> : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
}
