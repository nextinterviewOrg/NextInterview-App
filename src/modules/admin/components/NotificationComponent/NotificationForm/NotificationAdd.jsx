import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  RadioGroup,
  RadioOption,
  RadioLabel,
  ButtonGroup,
  Button,
  CloseButton,
} from "./NotificationAdd.styles";
import { sendNotification } from "../../../../../api/notificationApi"; // API function

const NotificationAdd = ({ isOpen, onClose, onSave }) => {
  const [timeVisibility, setTimeVisibility] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const initialFormData = {
    heading: "",
    subText: "",
    trigger: "Schedule",
    timeZone: "",
    time: "00:00",
    frequency: "",
    notificationType: "Only notification",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData); // Reset form fields when modal opens
      setTimeVisibility(initialFormData.trigger === "Schedule");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "trigger") {
      if (value === "Schedule") {
        setTimeVisibility(true);
      } else {
        setTimeVisibility(false);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.trigger === "Schedule" &&
      (!formData.timeZone || !formData.frequency)
    ) {
      alert(
        "Please select both time zone and frequency when trigger is 'Schedule'."
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendNotification({
        headingText: formData.heading,
        subText: formData.subText,
        Trigger: formData.trigger,
        timeZone: formData.timeZone,
        time: formData.time,
        frequency: formData.frequency,
        notificationType: formData.notificationType,
      });

      onSave(response); // Save and update parent state

      alert("Notification sent successfully!");

      setTimeout(() => {
        onClose(); // Close modal after ensuring state updates
      }, 0);
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>Create Notification</ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Heading</Label>
            <Input
              type="text"
              name="heading"
              placeholder="Type here"
              value={formData.heading}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Sub text</Label>
            <TextArea
              name="subText"
              placeholder="Type here"
              rows="3"
              value={formData.subText}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Trigger</Label>
            <Select
              name="trigger"
              value={formData.trigger}
              onChange={handleInputChange}
            >
              <option value="Schedule">Schedule</option>
              <option value="Immediately">Immediately</option>
            </Select>
          </FormGroup>
          {timeVisibility ? (
            <>
              <FormGroup>
                <Label>Select time zone</Label>
                <Select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="UTC">UTC</option>
                  <option value="IST">IST</option>
                  <option value="PST">PST</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Select time</Label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Frequency</Label>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  disabled={formData.trigger === "Immediately"}
                >
                  <option value="">Select</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </Select>
              </FormGroup>
            </>
          ) : null}

          <RadioGroup>
            <RadioOption>
              <input
                type="radio"
                name="notificationType"
                value="Only notification"
                checked={formData.notificationType === "Only notification"}
                onChange={handleInputChange}
              />
              <RadioLabel>Only notification</RadioLabel>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="notificationType"
                value="Only e-mail"
                checked={formData.notificationType === "Only e-mail"}
                onChange={handleInputChange}
              />
              <RadioLabel>Only e-mail</RadioLabel>
            </RadioOption>
            <RadioOption>
              <input
                type="radio"
                name="notificationType"
                value="Both notification and e-mail"
                checked={
                  formData.notificationType === "Both notification and e-mail"
                }
                onChange={handleInputChange}
              />
              <RadioLabel>Both notification and e-mail</RadioLabel>
            </RadioOption>
          </RadioGroup>

          <ButtonGroup>
            {/* <Button type="submit">{isLoading ? "creating..." : "Create"}</Button> */}
            <Button
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NotificationAdd;
