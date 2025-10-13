import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import useDeleteSingleNotification from "@/app/250327-twitter-ui/hooks/use-delete-single-notification";
import useDeleteUserNotifications from "@/app/250327-twitter-ui/hooks/use-delete-user-notifications";

import LoadingSpinner from "@/app/250327-twitter-ui/ui-components/common/loading-spinner-0";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

// utils
import { formatPostDate } from "@/app/250327-twitter-ui/utils/date/utils";

const NotificationPage = () => {
  const { deleteSingleNotification, deleteSingleNotificationIsPending } =
    useDeleteSingleNotification();
  const { deleteUserNotifications } = useDeleteUserNotifications();

  const { data: notificationsData, isLoading: notificationsDataIsLoading } =
    useQuery({
      queryKey: ["notifications"],
      queryFn: async () => {
        /*
         */
        try {
          const response = await fetch("/nodejs/api/notifications");
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          return data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    });

  // TODO: testing
  console.log("notificationsData = ", notificationsData);

  // TODO: delete code below as it was a placeholder for testing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoading = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notifications = [
    {
      _id: "1",
      from: {
        _id: "1",
        username: "johndoe",
        profileImg: "/public-250327-twitter-ui/avatars/boy2.png",
      },
      type: "follow",
    },
    {
      _id: "2",
      from: {
        _id: "2",
        username: "janedoe",
        profileImg: "/public-250327-twitter-ui/avatars/girl1.png",
      },
      type: "like",
    },
  ];

  const handleDeleteUserNotifications = () => {
    deleteUserNotifications();
  };

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>

          {/* The setting button - gearbox icon */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleDeleteUserNotifications}>
                  Delete all notifications
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* If page is loading */}
        {notificationsDataIsLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* if no notifications, then nothing to display */}
        {notificationsData?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}

        {/* Display each notification */}
        {notificationsData?.map((notification: Record<string, any>) => {
          const formattedDate = formatPostDate(notification.createdAt);

          return (
            <article
              className="border-b border-gray-700 px-4"
              key={notification._id}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 p-4">
                  {notification.type === "follow" && (
                    <FaUser className="w-7 h-7 text-primary" />
                  )}
                  {notification.type === "like" && (
                    <FaHeart className="w-7 h-7 text-red-500" />
                  )}
                  <Link
                    href={`/250327-twitter-ui/profile/${notification.from.username}`}
                  >
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <Image
                          alt="profile image"
                          fill
                          src={
                            notification.from.profileImg ||
                            "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                          }
                        />
                      </div>
                    </div>
                    <span className="text-gray-700 text-sm">
                      @{formattedDate}
                    </span>

                    {/* type of notification - "follow" or "liked" */}
                    <div className="flex gap-1">
                      <span className="font-bold">
                        @{notification.from.username}
                      </span>{" "}
                      {notification.type === "follow"
                        ? "followed you"
                        : "liked your post"}
                    </div>
                  </Link>
                </div>
                <aside>
                  {deleteSingleNotificationIsPending && (
                    <LoadingSpinner size="sm" />
                  )}
                  {!deleteSingleNotificationIsPending && (
                    <FaTrash
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => deleteSingleNotification(notification._id)}
                    />
                  )}
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
export default NotificationPage;
