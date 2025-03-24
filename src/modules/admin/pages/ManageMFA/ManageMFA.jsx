// Manage2FA.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Container,
  Header,
  StatusMessage,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseButton,
  MainContainer,
  InstraMessage,
  Instradiv,
  InstraHeading,
  InstraPara,
  InstraBtn
} from "./ManageMFA.styles.js";

import AddTOTP from "../AddTOTP/AddTOTP.jsx"; // The TOTP setup component (see below)

const ManageMFA = () => {
  const { user } = useUser();
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if TOTP is enabled for the user
    if (user) {
      setTwoFAEnabled(user.totpEnabled ?? false);
    }
  }, [user]);

  // Disable 2FA
  const handleDisableTOTP = async () => {
    setError(null);
    try {
      await user.disableTOTP();

      notification.success({
        message: "Success",  // Title of the notification
        description: "Two Factor Authentication (2FA (2FA) has been disabled successfully.",  // Description of the notification
        placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
        duration: 3,
      })
      // alert("2FA (TOTP) has been disabled successfully.");
      setTwoFAEnabled(false);
    } catch (err) {
      console.error("Error disabling TOTP:", err);
      setError("Failed to disable TOTP. Please try again.");
    }
  };

  // Open / Close the Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <MainContainer>
      <Container>
        <Header>
          <h2>Two-Factor Authentication</h2>
          <ActionButton onClick={openModal}>Add 2FA</ActionButton>
        </Header>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <StatusMessage>
          {twoFAEnabled
            ? "Two-Factor Authentication (2FA) is currently enabled on your account."
            : "Two-Factor Authentication (2FA) is not currently enabled on your account. "
          }
        </StatusMessage>
        <InstraMessage>
          {twoFAEnabled
            ? " This adds an extra layer of security to your login process."
            : " For enhanced security, we recommend setting up 2FA."
          }
        </InstraMessage>
        <Instradiv>
          <InstraHeading>
            Instructions
          </InstraHeading>
          <InstraPara>
            {twoFAEnabled
              // ? " If you wish to  add 2FA, please click the Add button below."
              ? ""
              : " To set up 2FA, please click on the Add button located at the top right corner of this page and follow the on-screen instructions."
            }
          </InstraPara>
          <InstraPara>
            {twoFAEnabled
              ? " If you wish to disable 2FA, please click the Disable button below."
              : " "
            }
          </InstraPara>
          <InstraBtn>
            {twoFAEnabled ? (
              <ActionButton onClick={handleDisableTOTP}>Disable 2FA</ActionButton>
            ) : (
              <></>
            )}
          </InstraBtn>
        </Instradiv>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={closeModal}>X</CloseButton>
              <AddTOTP
                onComplete={() => {
                  // Once TOTP is set up, reflect it in the UI:
                  setTwoFAEnabled(true);
                  closeModal();
                }}
              />
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </MainContainer>
  );
};

export default ManageMFA;
