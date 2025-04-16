import React, { useEffect, useState } from "react";
import {
  Container,
  NotificationCard,
  NotificationHeader,
  NotificationBody,
  Actions,
  ActionButton,
  ToggleSwitch,
  AddButton,
  NotificationContainer,
} from "../Notification/Notification.styles";
import { MdEdit, MdDelete } from "react-icons/md";
import NotificationAdd from "../../components/NotificationComponent/NotificationForm/NotificationAdd";
import NotificationEdit from "../../components/NotificationComponent/NotificationEdit/NotificationEdit";
import DeleteModule from "../../components/DeleteModule/DeleteModule";
import bellicon from "../../../../assets/BellIcon.svg";
import {
  deleteNotification,
  getAllNotifications,
} from "../../../../api/notificationApi";
import { message } from "antd";

const Notifications = () => {
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotificationIndex, setSelectedNotificationIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotifications();
        setNotifications(response.reverse());
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSaveNotification = async (formData) => {
    try {
      if (editData) {
        // Update existing notification
        setNotifications((prev) =>
          prev.map((notification, index) =>
            index === selectedNotificationIndex
              ? { ...formData, createdOn: notification.createdOn }
              : notification
          )
        );
      } else {
        // Add new notification at the beginning of the array
        setNotifications((prev) => [
          { ...formData, createdOn: new Date(), isActive: false },
          ...prev,
        ]);
      }

      setEditData(null);
      setIsModalOpen(false);

      const updatedNotifications = await getAllNotifications();
      setNotifications(updatedNotifications.reverse());
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  const handleEditNotification = (index) => {
    console.log(index);
    console.log(notifications[index]);
    const notificationToEdit = notifications[index];
    setSelectedNotificationIndex(index);
    
    // Prepare the edit data with all required fields
    setEditData({
      _id: notificationToEdit._id,
      headingText: notificationToEdit.headingText,
      subText: notificationToEdit.subText,
      Trigger: notificationToEdit.Trigger,
      notificationType: notificationToEdit.notificationType,
      timeZone: notificationToEdit.timeZone,
      time: notificationToEdit.time,
      frequency: notificationToEdit.frequency,
      // Add any additional fields that might be needed for the form
      ...(notificationToEdit.Trigger === "Schedule" && {
        selectedDays: notificationToEdit.selectedDays || [],
        selectedDate: notificationToEdit.selectedDate,
      })
    });
    
    setIsEditModalOpen(true);
  };

  const handleDeleteNotification = async () => {
    if (selectedNotificationId !== null) {
      try {
        await deleteNotification(selectedNotificationId);
        setNotifications((prev) =>
          prev.filter((_, i) => i !== selectedNotificationIndex)
        );
        message.success("Notification deleted successfully!");
        setSelectedNotificationIndex(null);
        setSelectedNotificationId(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Failed to delete notification", error);
      }
    }
  };

  const handleToggleSwitch = async (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, i) =>
        i === index
          ? { ...notification, isActive: !notification.isActive }
          : notification
      )
    );
  };

  return (
    <Container>
      <AddButton
        onClick={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
      >
        Create new notification
      </AddButton>

      {notifications && notifications.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "40px",
          }}
        >
          {notifications.map((notification, index) => (
            <NotificationCard key={index}>
              <NotificationHeader>
                <p>
                  <strong>Created On</strong> –   
                  {new Date(notification.created_on).toLocaleDateString()}
                </p>
                {notification.Trigger === "Schedule" && (
                  <ToggleSwitch
                    isActive={notification.isActive}
                    onClick={() => handleToggleSwitch(index)}
                  />
                )}
              </NotificationHeader>
              <NotificationBody>
                <h3>{notification.headingText}</h3>
                <p style={{ color: "black" }}>{notification.subText}</p>
                <p className="highlight">
                  <strong>Trigger</strong> – {notification.Trigger}
                </p>
                {notification.Trigger === "Schedule" && (
                  <>
                    <p>
                      <strong>Time Zone</strong> – {notification.timeZone}
                    </p>
                    <p>
                      <strong>Time</strong> – {notification.time}
                    </p>
                    <p>
                      <strong>Frequency</strong> – {notification.frequency}
                    </p>
                    {notification.frequency === "Weekly" && notification.selectedDays && (
                      <p>
                        <strong>Days</strong> – {notification.selectedDays.join(", ")}
                      </p>
                    )}
                    {notification.frequency === "Monthly" && notification.selectedDate && (
                      <p>
                        <strong>Date</strong> – {notification.selectedDate}
                      </p>
                    )}
                  </>
                )}
                <p className="small-text">{notification.notificationType}</p>
              </NotificationBody>

              <Actions>
                {notification.Trigger === "Schedule" && (
                  <ActionButton onClick={() => handleEditNotification(index)}>
                    <MdEdit />
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => {
                    setSelectedNotificationId(notification._id);
                    setSelectedNotificationIndex(index);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <MdDelete />
                </ActionButton>
              </Actions>
            </NotificationCard>
          ))}
        </div>
      ) : (
        <NotificationContainer>
          <img className="bellicon" src={bellicon} alt="Bell Icon" />
          <p className="nonotifications">No notifications created yet</p>
        </NotificationContainer>
      )}

      {isDeleteModalOpen && (
        <DeleteModule
          onDelete={handleDeleteNotification}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      <NotificationAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(formData) => {
          handleSaveNotification(formData);
          setIsModalOpen(false);
        }}
        initialValues={editData}
      />

      <NotificationEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(formData) => {
          handleSaveNotification(formData);
          setIsEditModalOpen(false);  

        }}
        notificationData={editData}
        />
    </Container>
  );
};

export default Notifications;