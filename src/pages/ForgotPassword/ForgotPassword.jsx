import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft, RxFontSize } from "react-icons/rx";
import {
  Container,
  BackIcon,
  FormSection,
  Title,
  Subtitle,
  InputContainer,
  Input,
  Button,
  Label,
} from "./ForgotPassword.styles";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import { useSignIn } from "@clerk/clerk-react";
import MessageStatus from "../MessageStatus/MessageStatus";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate(); // Message to show
  const [messageType, setMessageType] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
    }
    // Add API call for password reset}

    if (!email) {
      setMessage("Please enter an email address.");
      setMessageType("warning");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    try {
      const data = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      console.log("data", data);
      // setMessage("Password reset email sent. Please
      //
      setMessage("Password reset email sent. Please check your inbox.");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType(null);
        navigate("/resetpassword");
      }, 5000);
      // setError(null);

      // Optionally, redirect to a confirmation page
    } catch (err) {
      console.error("Error resetting password:", err);

      if (err.errors?.[0]?.code === "invalid_identifier") {
        setMessage("Please enter a valid email address.");
        setMessageType("warning");
      } else {
        setMessage("Please enter a valid email address.");
        setMessageType("warning");
      }
      setMessage("Email is not registered.");
      setMessageType("warning");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <HeaderWithLogo />
      <Container>
        <FormSection>
          <BackIcon onClick={handleGoBack}>
            <RxArrowLeft />
          </BackIcon>
          <Title>Forgot Password ?</Title>
          <Subtitle>
            Reset instructions will be sent to your registered email.
          </Subtitle>
          <InputContainer>
            <Label>E-Mail ID</Label>
            <Input
              type="email"
              value={email}
              placeholder="Enter your registered E-Mail ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <MessageStatus message={message} messageType={messageType} />
          <Button message={!!message} onClick={handleResetPassword}>
            Reset Password
          </Button>
        </FormSection>
      </Container>
    </div>
  );
};

export default ForgotPassword;
