import React, { useState, useEffect, useRef } from "react";
import { useUser, useSignIn, useSignUp } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByClerkId, getUserBySessionId } from "../../api/userApi";
import { Input, notification } from "antd";
import {
  BackIcon,
  Container,
  OTPMessage,
  OTPInputContainer,
  Section,
  SubmitButton
} from "./VerifyTOTP.styles";
import { RxArrowLeft } from "react-icons/rx";
const VerifyTOTP = () => {
  const { user } = useUser();
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [hiddenOtp, setHiddenOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const handleGoBack = () => {
    // If user wants to change phone number, navigate back
    navigate("/login");
  };
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

  // Handle TOTP verification
  const handleVerifyTOTP = async (e) => {
    const otpCode = otp.join("");
    e.preventDefault();
    setLoading(true);
    try {
      const verificationResponse = await signIn.attemptSecondFactor({
        strategy: "totp",
        code: otpCode,
      });
      if (verificationResponse.status === "complete") {
        navigate("/validation", {
          state: {
            sessionId: verificationResponse.createdSessionId,
          },
        });
      } else {
        setError("Incorrect TOTP code. Please try again.");
      }
    } catch (error) {
      console.log(error.errors);
      setError("Failed to verify the TOTP code. Please try again.");
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
          description: "Incorrect code. Please check and try again.",  // Error message description
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
      if (error.errors[0].code == "form_param_nil") {
        notification.info({
          message: "Info",  // Title of the notification
          description: "Enter code.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is found
      //   history('/login');
    }
  }, [user, history]);

  return (<>
    <Container>
      <Section>
        {/* <div style={{ marginLeft: "60px", padding: "20px" }}> */}
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
        <OTPMessage>Enter the code from your Authenticator app:</OTPMessage>

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
        {/* <h1>Verify Your MFA Code</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleVerifyTOTP}>
          <div>
            <label>Enter the code from your Authenticator app:</label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        </form> */}
        <SubmitButton onClick={handleVerifyTOTP}>Submit</SubmitButton>
      </Section>
      {/* </div> */}
    </Container>
  </>
  );
};

export default VerifyTOTP;
