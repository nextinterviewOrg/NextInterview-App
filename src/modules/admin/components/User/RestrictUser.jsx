import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../../../theme/Theme";
import { restrictUser } from "../../../../api/userApi";
import { message } from "antd";
import restrict from "../../../../assets/restrict.gif";

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

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
  @media (max-width: ${theme.breakpoints.desktop}) {
    justify-content: center;
  }
`;

const Modal = styled.div`
  border-radius: 8px;
  padding: 30px;
  text-align: center;
`;

const ModalContent = styled.div`
  background: ${theme.colors.light};
  border-radius: 8px;
  width: 600px; /* Increased width for a wider modal */
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure proper positioning of the button */

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 85%; /* Full width for mobile */
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 85%; /* Full width for tablet */
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.showSuccess ? "flex-end" : "space-between"};
  align-items: center;
  margin-bottom: 20px;


`;

const Title = styled.h3`
  font-size: 20px;
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: ${theme.colors.textgray};
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${theme.colors.text};
  width: 150px; /* Fixed width for labels to align inputs consistently */
  margin-right: 10px;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid ${theme.colors.textgray};
  border-radius: 4px;
  font-size: 14px;
  font-family: ${theme.fonts.body};
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 8px;
  border: 1px solid ${theme.colors.textgray};
  border-radius: 4px;
  font-size: 14px;
  resize: none;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${theme.fonts.body};

  
`;

const Input = styled.input`
  border: 1px solid ${theme.colors.textgray};
  flex: 1;
  padding: 8px;
  //   border: 1px solid ${theme.colors.light};
  border-radius: 4px;
  font-size: 14px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px; /* Add spacing from the form elements */

  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
`;

const Button = styled.button`
  background-color: ${theme.colors.secondary};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const RestrictImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const RestrictUser = ({ isOpen, onClose, selectedRows }) => {
  const [reason, setReason] = useState("Illegal activities");
  const [remarks, setRemarks] = useState("");
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState("Week");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
    window.location.reload();
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Start loading
  try {
    const startDate = new Date();
    const endDate = new Date();

    if (durationUnit === "Week") {
      const days = duration * 7;
      endDate.setDate(startDate.getDate() + days);
    } else if (durationUnit === "Month") {
      endDate.setMonth(startDate.getMonth() + duration);
    } else if (durationUnit === "Day") {
      endDate.setDate(startDate.getDate() + duration);
    }

    await restrictUser({
      clerk_ids: selectedRows,
      startDate,
      endDate,
      reason,
      remarks,
    });

    message.success("User restricted successfully!");
    setShowSuccess(true);
  } catch (error) {
    message.error("Failed to restrict user.");
  } finally {
    setLoading(false); // End loading
  }
};

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader showSuccess={showSuccess}>
          {!showSuccess && <Title>Restrict user</Title>}
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        {showSuccess ? (
          <Modal>
            <RestrictImage src={restrict} alt="Success" />
            <h3>User Restricted Successfully</h3>
          </Modal>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Reason</Label>
              <Select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Illegal activities">Illegal activities</option>
                <option value="Violation of terms">Violation of terms</option>
                <option value="Spamming">Spamming</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Remarks (optional)</Label>
              <TextArea
                rows="3"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks here..."
              />
            </FormGroup>
            <FormGroup>
              <Label>Duration</Label>
              <InputGroup>
                <Input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <Select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                >
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </Select>
              </InputGroup>
            </FormGroup>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "-10px" }}>
              This will be notified to the user through email
            </p>
            <ButtonContainer>
              <Button type="submit" disabled={loading}>
                {loading ? "Restricting..." : "Restrict"}
                </Button>
            </ButtonContainer>
          </form>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default RestrictUser;
