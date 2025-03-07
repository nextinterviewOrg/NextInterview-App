import React from "react";
import { IoCloseSharp, IoCloseCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 35%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.borderColor};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const NotificationModal = ({ type, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Define styles based on type
  const typeStyles = {
    success: { 
      color: "#5cb85c", 
      bgColor: "#e6ffed", 
      borderColor: "1px solid #5cb85c", 
      icon: <IoCheckmarkCircleOutline color="#5cb85c" size={22} /> // Success Icon ✅
    },
    error: { 
      color: "#d9534f", 
      bgColor: "#ffe6e6", 
      borderColor: "1px solid #d9534f", 
      icon: <IoCloseCircleOutline color="#d9534f" size={22} /> // Error Icon ❌
    },
    warning: { 
      color: "#f0ad4e", 
      bgColor: "#fff8e6", 
      borderColor: "1px solid #f0ad4e", 
      icon: <TiWarningOutline color="#f0ad4e" size={22} /> // Warning Icon ⚠️
    },
    default: { 
      color: "#ffffff", 
      bgColor: "#64748B", 
      borderColor: "1px solid #1E293B", 
      icon: null 
    },
  };

  const { color, bgColor, borderColor, icon } = typeStyles[type] || typeStyles.default;

  return (
    <ModalContainer color={color} bgColor={bgColor} borderColor={borderColor}>
      {icon} {/* Display the respective icon based on type */}
      <span>{message}</span>
      <CloseButton onClick={onClose} color={color}>
        <IoCloseSharp />
      </CloseButton>
    </ModalContainer>
  );
};

export default NotificationModal;
