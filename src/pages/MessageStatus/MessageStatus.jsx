import React from "react";
import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";
import { MessageCard } from "../SignUp/SignUp.styles"; // Adjust the import path as needed

const MessageStatus = ({ message, messageType }) => {
  if (!message) return null;

  let Icon;
  if (messageType === "error") Icon = IoCloseCircleOutline;
  else if (messageType === "warning") Icon = TiWarningOutline;
  else if (messageType === "success") Icon = IoCheckmarkCircleOutline;

  return (
    <MessageCard type={messageType}>
      <Icon style={{ marginRight: "8px", fontSize: "20px" }} /> {message}
    </MessageCard>
  );
};

export default MessageStatus;
