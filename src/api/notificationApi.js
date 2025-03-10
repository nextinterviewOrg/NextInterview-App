import api from "../config/axiosconfig";

export const getAllNotifications = async () => {
  try {
    const response = await api.get("/notification/get");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendNotification = async (data) => {
  try {
    const response = await api.post("/notification/send", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateNotification = async (id, data) => {
  try {
    const response = await api.put(
      `/notification/updateNotification/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notification/deleteNotification/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.put(
      `/notification/notificationRead/${userId}/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNotificationByUser = async (userId) => {
  try {
    const response = await api.get(
      `/notification/getNotificationByUser/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
