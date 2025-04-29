import React, { useState, useEffect, useRef } from "react";
import { RxArrowLeft } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import { Input, notification } from "antd";
// import your styled components
import {
  Container,
  Section,
  BackIcon,
  OTPMessage,
  OTPInputContainer,
  SubmitButton,
  ResendMessage,
} from "./Otp.styles";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [hiddenOtp, setHiddenOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setHiddenOtp((prev) => {
      let newHidden = [...prev];
      newHidden[index] = value.substring(value.length - 1);
      return newHidden;
    });

    setTimeout(() => {
      setHiddenOtp((prev) => {
        let newHidden = [...prev];
        if (newOtp[index] !== "") newHidden[index] = "●";
        return newHidden;
      });
    }, 500);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      let newHiddenOtp = [...hiddenOtp];
      newOtp[index] = "";
      newHiddenOtp[index] = "";
      setOtp(newOtp);
      setHiddenOtp(newHiddenOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const [countdown, setCountdown] = useState(300);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (canResend) {
      try {
        if (location.state.flow === "SIGN_UP") {
          console.log("Phone number: ", location.state.phoneNumber);
          const result = await signUp.create(location.state.data);
          await signUp.preparePhoneNumberVerification({
            strategy: "phone_code",
          });

          console.log("OTP Resent: ", result);

          setCountdown(300);  // Set countdown to 5 minutes (300 seconds)
          setCanResend(false); // Prevent further resend requests until the countdown ends

          // alert("OTP has been resent successfully!");
          notification.success({
            message: "Success",  // Title of the notification
            description: "OTP has been resent successfully!",  // Description of the notification
            placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
            duration: 3,
          })
        } else {


          // Resend the OTP using Clerk's signUp object
          const result = await signIn.create({
            identifier: location.state.phoneNumber, // Phone number of the user
            strategy: "phone_code", // Phone OTP verification strategy
          });

          console.log("OTP Resent: ", result);

          setCountdown(300);  // Set countdown to 5 minutes (300 seconds)
          setCanResend(false); // Prevent further resend requests until the countdown ends

          // alert("OTP has been resent successfully!");
          notification.success({
            message: "Success",  // Title of the notification
            description: "OTP has been resent successfully!",  // Description of the notification
            placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
            duration: 3,
          })
        }
      } catch (error) {
        console.log("Error resending OTP: ", error);
        notification.error({
          message: "Error",  // Title of the notification
          description: "Failed to resend OTP. Please try again.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
        // alert("Failed to resend OTP. Please try again.");
      }
    } else {
      notification.info({
        message: "Info",  // Title of the notification
        description: "Please wait before requesting a new OTP.",  // Error message description
        placement: "topRight",
        duration: 3,
      });
      // alert("Please wait before requesting a new OTP.");
    }

    // if (canResend) {
    //   setCountdown(3000);
    //   setCanResend(false);
    // }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const setActiveSignIn = useSignIn().setActive;
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  const [otpCode, setOtpCode] = useState("");
  const [flow, setFlow] = useState(""); // "SIGN_IN" or "SIGN_UP"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Extract flow + phoneNumber from react-router location.state
  useEffect(() => {
    if (location?.state) {
      setFlow(location.state.flow || "");
      setPhoneNumber(location.state.phoneNumber || "");
      setEmail(location.state.email || "");
    }
  }, [location.state]);

  // Wait until Clerk is loaded
  if (!signInLoaded || !signUpLoaded) {
    return <div className="otp-loading-spinner"><span className="spinner" /></div>;
  }

  const handleGoBack = () => {
    if (flow === "SIGN_UP") {
      // If user wants to change phone number, navigate back
      navigate("/signup", { state: { flow: location.state.flow } });
    }else if(flow === "SIGN_IN"){
      navigate("/loginPhone", { state: { flow: location.state.flow } });
    }
   
    // If user wants to change phone number, navigate back
   
  };

  // Only allow digits in the OTP field
  const handleKeyPress = (e) => {
    const isDigit = /[0-9]/.test(e.key);
    if (!isDigit) {
      e.preventDefault();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.trim().length === 0) {
      // alert("Please enter the OTP code you received");
      notification.error({
        message: "Error",  // Title of the notification
        description: "Please enter the OTP code you received",  // Error message description
        placement: "topRight",
        duration: 3,
      });
      return;
    }

    try {
      if (flow === "SIGN_IN") {
        if (countdown === 0) {
          notification.error({
            message: "Error",  // Title of the notification
            description: "OTP has expired. Please request a new one.",  // Error message description
            placement: "topRight",
            duration: 3,
          });
          return
        }
        // Attempt signIn
        const result = await signIn.attemptFirstFactor({
          strategy: "phone_code",
          code: otpCode,
        });
        console.log("result", result);
        localStorage.setItem("session", result.createdSessionId);
        if (result.status === "complete") {
          // Successfully signed in
          await setActiveSignIn({ session: result.createdSessionId });
          notification.success({
            message: "Success",  // Title of the notification
            description: "You have successfully signed in!",  // Description of the notification
            placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
            duration: 3,
          })
          // alert("You have successfully signed in!");
          navigate("/validation", {
            state: {
              sessionId: result.createdSessionId,
            },
          });
        } else {
          notification.error({
            message: "Error",  // Title of the notification
            description: "Incorrect OTP. Please try again.",  // Error message description
            placement: "topRight",
            duration: 3,
          });
          // alert("Incorrect OTP. Please try again.");
        }
      } else if (flow === "SIGN_UP") {
        // Attempt signUp phone verification
        if (countdown === 0) {
          notification.error({
            message: "Error",  // Title of the notification
            description: "OTP has expired. Please request a new one.",  // Error message description
            placement: "topRight",
            duration: 3,
          });
          return
        }
        const attempt = await signUp.attemptPhoneNumberVerification({
          code: otpCode,
        });

        const { verifications, status, createdSessionId } = attempt;

        // Check if signUp is complete
        if (verifications?.phoneNumber?.status === "verified") {
          // Successfully signed up & automatically signed in
          await setSignUpActive({ session: createdSessionId });
          notification.success({
            message: "Success",  // Title of the notification
            description: "Your Phone Number has been successfully verified!",  // Description of the notification
            placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
            duration: 3,
          });
          const data2 = await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
          // alert("You Phone Number has been successfully verified!");
          navigate("/otpEmail", {
            state: {
              flow: "SIGN_UP",
              phoneNumber: phoneNumber,
              email: email,
            },
          });
        } else {
          notification.error({
            message: "Error",  // Title of the notification
            description: "Incorrect OTP. Please try again. one.",  // Error message description
            placement: "topRight",
            duration: 3,
          });
          // alert("Incorrect OTP. Please try again. one");
        }
      } else {
        // alert("Unknown flow. Please try again.");
      }
    } catch (error) {
      console.log("Error verifying OTP: ", error.errors);
      if (error.errors[0].code == "verification_failed") {
        notification.error({
          message: "Login Failed",  // Title of the notification
          description: "Too many failed attempts. You have to try again with the same or another method.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
      }
      if (error.errors[0].code == "form_code_incorrect") {
        notification.error({
          message: "Login Failed",  // Title of the notification
          description: "Incorrect OTP. Please check and try again.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
      }
      if (error.errors[0].code == "too_many_requests") {
        notification.error({
          message: "Error",  // Title of the notification
          description: "Too many requests. Please try again in a bit.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
      }

      // al ert("Failed to verify OTP. Please check and try again.");
    }
  };

  return (
    <>
      <HeaderWithLogo />
      <Container>
        <Section>
          <BackIcon
            onClick={handleGoBack}
            style={{
              borderRadius: "10%",
              border: "1px solid grey",
              padding: "8px",
            }}
          >
            <RxArrowLeft className="back-icon" />
          </BackIcon>

          <OTPMessage>OTP has been sent to {phoneNumber}</OTPMessage>

          <OTPInputContainer>
            <label htmlFor="otp">Enter OTP</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={hiddenOtp[index]}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: "1px solid #1A1C1E",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          </OTPInputContainer>

          <ResendMessage onClick={handleResend} disabled={!canResend} style={{ cursor: canResend ? "pointer" : "not-allowed" }}>
            {canResend ? (
              <a className="resendotp">Resend OTP</a>
            ) : (
              <>
                Resend OTP in <span>{countdown} secs</span>
              </>
            )}
          </ResendMessage>

          <SubmitButton onClick={handleVerifyOTP}>Submit</SubmitButton>
        </Section>
      </Container>
    </>
  );
};

export default Otp;
