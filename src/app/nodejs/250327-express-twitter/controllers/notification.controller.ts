import Notification from "../models/notification.model.ts";

export const getNotifications = async (request: any, response: any) => {
  try {
    const userId = request.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    // NOTE: this updates all notification as "read", meaning the user has received the notification.
    await Notification.updateMany({ to: userId }, { read: true });

    return response.status(200).json(notifications);
  } catch (error: any) {
    console.log("Error in getNotifications function: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteNotifications = async (request: any, response: any) => {
  try {
    // userId -> remove notifications -> return response.json
    const userId = request.user._id;

    await Notification.deleteMany({ to: userId });

    return response
      .status(200)
      .json({ message: "Notifications deleted successfully" });
  } catch (error: any) {
    console.error("Error in deleteNotifications function: ", error);

    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteSingleNotification = async (request: any, response: any) => {
  try {
    const userId = request.user._id;
    const notificationId = request.params.id;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return response.status(404).json({ error: "Notification not found" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return response
        .status(403)
        .json({ error: "You are not allowed to delete this notification" });
    }

    await Notification.findByIdAndDelete(notificationId);

    return response
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    console.log("Error in deleteNotification function: ", error.message);
    return response.status(500).json({
      error: "Internal server error",
      message: error.message || "Something went wrong",
    });
  }
};
