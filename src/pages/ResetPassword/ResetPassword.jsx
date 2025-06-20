import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { PiEyeLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BackIcon,
  FormSection,
  Title,
  Subtitle,
  InputContainer,
  Input,
  Button,
  Error,
  Success,
  Label,
  ValidationIcon,
} from "./ResetPassword.styles";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import { useSignIn, SignedOut } from "@clerk/clerk-react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import MessageStatus from "../MessageStatus/MessageStatus";
import { Message } from "../passwordresetsuccessful/ResetSuccessful.styles";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoaded, signIn, user, setActive } = useSignIn();
  const [message, setMessage] = useState(null); // Message to show
  const [messageType, setMessageType] = useState(null);
  const [isCodeEntered, setIsCodeEntered] = useState(false);

  const handleGoBack = () => {
    navigate("/forgotpassword");
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !verificationCode) {
      setMessage("Please fill in all fields.");
      setMessageType("warning");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (
      password.length < 8 ||
      !/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/.test(password)
    ) {
      setMessage(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      setMessageType("error");
      return;
    }

    try {
      await signIn
        ?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: verificationCode,
          password: password,
        })
        .then((result) => {
          if (result.status === "needs_second_factor") {
            setMessage("Additional verification required.");
            setMessageType("warning");
          } else if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            navigate("/resetsuccessful");
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          console.error("error", err.errors);
          if (err.errors[0].code === "verification_code_invalid") {
            // alert("Incorrect verification code. Please try again.");
          } else if (err.errors[0].code === "verification_code_invalid") {
            // alert("Incorrect verification code. Please try again.");
            setMessage(err.errors[0].message);
          } else if (err.errors[0].code === "verification_code_expired") {
            setMessage(err.errors[0].message);
          } else   if (err.errors[0].code === "form_code_incorrect") {
            setMessage("Incorrect OTP. Please try again.");
          } else {
            setMessage(err.errors[0].message);

          }
          setMessageType("error");
        });
    } catch (error) {
      setMessage("An error occurred during password reset.");
      setMessageType("error");
    }
  };

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value;
    setVerificationCode(value);
    setIsCodeEntered(value.trim().length > 0); // Enable password fields when a code is entered
    const onlyNumber = value.replace(/\D/g, ""); // Remove non-numeric characters
    setVerificationCode(onlyNumber);
  };


  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  return (
    <div>
      <HeaderWithLogo />
      <Container>
        <FormSection>
          <BackIcon onClick={handleGoBack}>
            <IoMdArrowBack />
          </BackIcon>
          <Title>Reset Password</Title>
          <Subtitle>
            Password must be alphanumeric and contain at least 8 characters.
          </Subtitle>
          {/* <form onSubmit={handleFormSubmit}> */}
          <form>
            <InputContainer>
              <Label>Email verification code</Label>
              <div style={{ position: "relative" }}>
                <Input
                  type={"text"}
                  placeholder="Enter your new verification code"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  maxLength={6}
                />
              </div>
            </InputContainer>
            <InputContainer>
              <Label>New Password</Label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isCodeEntered} // Disable input until code is entered
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showNewPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <PiEyeLight size={18} />
                  )}
                </button>
                {password && (
                  <ValidationIcon>
                    <AiOutlineCheckCircle color="green" />
                  </ValidationIcon>
                )}
              </div>
            </InputContainer>

            <InputContainer>
              <Label>Confirm Password</Label>
              <div style={{ position: "relative" }}>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isCodeEntered} // Disable input until code is entered
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <PiEyeLight size={18} />
                  )}
                </button>
                {confirmPassword && (
                  <ValidationIcon>
                    {passwordsMatch ? (
                      <AiOutlineCheckCircle color="green" />
                    ) : (
                      <AiOutlineCloseCircle color="red" />
                    )}
                  </ValidationIcon>
                )}
              </div>
              {!passwordsMatch && confirmPassword && (
                <Error>Passwords do not match.</Error>
              )}
            </InputContainer>

            <MessageStatus message={message} messageType={messageType} />

            <Button type="submit" onClick={handleFormSubmit}>
              Reset Password
            </Button>
          </form>
        </FormSection>
      </Container>
    </div>
  );
};

export default ResetPassword;
