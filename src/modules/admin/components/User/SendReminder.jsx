import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../../../theme/Theme";
import { sendReminder } from "../../../../api/reminderApi";
import { getUserByClerkId } from "../../../../api/userApi";
import { message } from "antd";

// Styled components
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 600px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  /* font-family: ${theme.fonts.body}; */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
    /* font-family: ${theme.fonts.body}; */
  font-size: 20px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  /* font-family: ${theme.fonts.body}; */
  /* font-family: ${theme.fonts.body}; */
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`;

const Input = styled.input`
  /* font-family: ${theme.fonts.body}; */
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  /* font-family: ${theme.fonts.body}; */
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderblue};
  border-radius: 4px;
  font-size: 14px;
  resize: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const RadioGroup = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  input {
    margin-right: 8px;
    accent-color: green;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SendReminder = ({ isOpen, onClose, selectedRows }) => {
  const [heading, setHeading] = useState("");
  const [subText, setSubText] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("Only notification");

  // Error states for validation
  const [errors, setErrors] = useState({
    heading: "",
    subText: "",
  });

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { heading: "", subText: "" };

    if (!heading.trim()) {
      newErrors.heading = "Please fill the above field.";
      isValid = false;
    }

    if (!subText.trim()) {
      newErrors.subText = "Please fill the above field.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    message.loading("Sending reminder...");

    // Close the modal after clicking the button
    onClose();

    try {
      let userIds = [];

      // Using Promise.all to ensure all API calls complete before proceeding
      await Promise.all(
        selectedRows.map(async (row) => {
          const user = await getUserByClerkId(row);
          if (user.data && user.data.user) {
            userIds.push(user.data.user._id);
          }
        })
      );

      // Sending reminder to all selected users
      await sendReminder({
        heading: heading,
        subText: subText,
        notificationType: deliveryMode,
        user_id: userIds,
      });

      message.success("Reminder sent successfully!");
    } catch (error) {
      console.error("Error sending reminder:", error);
      message.error("Failed to send reminder. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <Title>Send Reminder</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          {/* Heading Input */}
          <FormGroup>
            <Label>Heading</Label>
            <Input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter heading here..."
            />
            {errors.heading && <ErrorMessage>{errors.heading}</ErrorMessage>}
          </FormGroup>

          {/* SubText Input */}
          <FormGroup>
            <Label>Sub Text</Label>
            <TextArea
              rows="3"
              value={subText}
              onChange={(e) => setSubText(e.target.value)}
              placeholder="Enter sub text here..."
            />
            {errors.subText && <ErrorMessage>{errors.subText}</ErrorMessage>}
          </FormGroup>

          {/* Radio Options */}
          <RadioGroup>
            <RadioButton>
              <input
                type="radio"
                value="Only notification"
                checked={deliveryMode === "Only notification"}
                onChange={(e) => setDeliveryMode(e.target.value)}
              />
              Only notification
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                value="Only e-mail"
                checked={deliveryMode === "Only e-mail"}
                onChange={(e) => setDeliveryMode(e.target.value)}
              />
              Only e-mail
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                value="Both notification and e-mail"
                checked={deliveryMode === "Both notification and e-mail"}
                onChange={(e) => setDeliveryMode(e.target.value)}
              />
              Both notification and e-mail
            </RadioButton>
          </RadioGroup>

          {/* Button Group */}
          <ButtonContainer>
            <Button type="submit">Send</Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default SendReminder;
