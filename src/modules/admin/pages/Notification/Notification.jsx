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
import DeleteModule from "../../components/DeleteModule/DeleteModule";
import bellicon from "../../../../assets/BellIcon.svg";
import {
  deleteNotification,
  getAllNotifications,
} from "../../../../api/notificationApi"; // Import the API functions
 
const Notifications = () => {
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [notifications, setNotifications] = useState([]); // Already initialized to an empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNotificationIndex, setSelectedNotificationIndex] =
    useState(null);
  const [editData, setEditData] = useState(null);
 
  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotifications();
        setNotifications(response.reverse()); // Ensure latest are at the top
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
          ...prev, // Ensure latest is at the top
        ]);
      }
 
      setEditData(null); // Reset edit data
      setIsModalOpen(false); // Close modal
 
      // Re-fetch notifications to update the UI
      const updatedNotifications = await getAllNotifications();
      setNotifications(updatedNotifications.reverse()); // Ensure latest are at the top
 
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };
 
 
  const handleEditNotification = (index) => {
    setSelectedNotificationIndex(index);
    setEditData(notifications[index]);
    setIsModalOpen(true);
  };
 
  const handleDeleteNotification = async () => {
    if (selectedNotificationId !== null) {
      try {
        await deleteNotification(selectedNotificationId);
        setNotifications((prev) =>
          prev.filter((_, i) => i !== selectedNotificationIndex)
        );
        setSelectedNotificationIndex(null);
        setSelectedNotificationId(null); // Reset ID after deletion
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
      <>
        <AddButton
          onClick={() => {
            setEditData(null); // Reset edit data
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
  isActive={notification.isActive} // Pass the isActive state
  onClick={() => handleToggleSwitch(index)} // Toggle on click
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
                    </>
                  )}
                  <p className="small-text">{notification.notificationType}</p>
                </NotificationBody>
 
                <Actions>
                  {notification.Trigger === "Schedule" &&   (
                  <ActionButton onClick={() => handleEditNotification(index)}>
                    <MdEdit />
                  </ActionButton>
                  )}
                  <ActionButton
                    onClick={() => {
                      setSelectedNotificationId(notification._id); // Set the notification ID for deletion
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
          <>
            <NotificationContainer>
              <img className="bellicon" src={bellicon} alt="Bell Icon" />
              <p className="nonotifications">No notifications created yet</p>
              {/* <AddButton
                onClick={() => {
                  setEditData(null); // Reset edit data
                  setIsModalOpen(true);
                }}
              >
                Create new notification
              </AddButton> */}
            </NotificationContainer>
          </>
        )}
 
        {isDeleteModalOpen && (
          <DeleteModule
            onDelete={handleDeleteNotification}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </>
 
      <NotificationAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(formData) => {
          handleSaveNotification(formData);
          setIsModalOpen(false);
        }}
        initialValues={editData} // Pass initial values for editing
      />
    </Container>
  );
};
 
export default Notifications;
 
 