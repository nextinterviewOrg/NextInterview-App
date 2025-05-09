import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignIn, useSignUp, useAuth } from "@clerk/clerk-react";
import { RxArrowLeft } from "react-icons/rx";
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import PhoneInput, { getCountries, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// import { IoIosArrowRoundBack } from "react-icons/io";

// import your styled components
import {
  Loginmobilewrapper,
  Subtitle,
  InputContainer,
  Label,
  Button,
} from "./Login.styles";
import { Input, notification } from "antd";
import MessageStatus from "../MessageStatus/MessageStatus";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null); // Message to show
  const [messageType, setMessageType] = useState(null);
  useEffect(() => {
    setIsError(false);
    setMessage(null);
    setMessageType(null);
  }, []);

  // Clerk hooks
  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const { isLoaded: authLoaded } = useAuth();

  // Local state
  const [phoneNumber, setPhoneNumber] = useState("");

  // Optional: you can check if Clerk is loaded
  if (!signInLoaded || !signUpLoaded || !authLoaded) {
    return <div>Loading Clerk...</div>;
  }

  const handleSendOTP = async () => {
    setIsError(false);
    setMessage(null);
    setMessageType(null);
    console.log("phoneNumber", phoneNumber);
    const isValidPhone = isValidPhoneNumber(phoneNumber);

    if (!isValidPhone) {
      setIsError(true);
      setMessage("Please enter a valid phone number.");
      setMessageType("error");
      return;
    }

    const fullPhoneNumber = `${phoneNumber.trim()}`;
    if (location.state.flow === "SIGN_UP") {
      try {
        await signUp.create({
          phoneNumber: fullPhoneNumber,
        });

        // Prepare phone verification for sign-up
        await signUp.preparePhoneNumberVerification({
          strategy: "phone_code",
        });

        alert("Sign-up OTP has been sent to your phone number.");

        // Navigate to /otp with state
        navigate("/otp", {
          state: {
            flow: "SIGN_UP",
            phoneNumber: fullPhoneNumber,
          },
        });
      } catch (signUpError) {
        notification.error({
          message: "Error",  // Title of the notification
          description: "Something went wrong. Please try again.",  // Error message description
          placement: "topRight",
          duration: 3,
        });
        // alert("Something went wrong while sending OTP. Please try again.");
      }
    } else if (location.state.flow === "SIGN_IN") {
      try {
        // 1) Try Sign In first
        const result = await signIn.create({
          identifier: fullPhoneNumber,
          strategy: "phone_code",
        });
        console.log("result", result);
        notification.success({
          message: "Success",  // Title of the notification
          description: "OTP has been sent to your phone number successfully!",  // Description of the notification
          placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
          duration: 3,
        });

        // If we're here, user is found → flow = SIGN_IN
        // alert(`Sign-in OTP has been sent to your phone number. ${result}`);

        // Navigate to /otp with state
        navigate("/otp", {
          state: {
            flow: "SIGN_IN",
            phoneNumber: fullPhoneNumber,
          },
        });
      } catch (error) {
        console.log("Sign-in error 11 :", error.errors[0]);
        if (error.errors[0].code == "form_identifier_not_found") {
          setMessage("Couldn't find your account.");
          setMessageType("error");
          setIsError(true);
        } else if (error?.errors[0]?.code == "session_exists") {
          setMessage("You're currently in single session mode. You can only be signed into one account at a time.");
          setMessageType("error");
          setIsError(true);
        }
        else if (error?.errors[0]?.code == "user_locked") {
          setMessage("Your account has been Restricted. For more information, please contact support:- support@nextinterview.ai");
          setMessageType("error");
          setIsError(true);

        }
        else {
          notification.error({
            message: "Error",  // Title of the notification
            description: "Something went wrong. Please try again.",  // Error message description
            placement: "topRight",
            duration: 3,
          });
          // alert("Something went wrong while sending OTP. Please try again.");
        }
      }
    }
  };

  const handleGoBack = () => {
    if (location.state.flow === "SIGN_UP") {
      navigate("/signup");
    } else if (location.state.flow === "SIGN_IN") {
      navigate("/login");
    }
  };

  return (
    <>
      <Loginmobilewrapper>
        <HeaderWithLogo />
        <div className="Container">
          <div className="BackIcon" onClick={handleGoBack}>
            <RxArrowLeft />
          </div>

          <div className="Title">Login with Mobile Number</div>
          <Subtitle>OTP will be sent to your mobile number</Subtitle>
          {/* <div className="Form"> */}
          <Label className="Label">Mobile Number</Label>
          <PhoneInput
            className="Input"
            international
            defaultCountry="IN" // Set the default country code (IN for India)
            value={phoneNumber}
            onChange={setPhoneNumber}
            error={isError}
          />
          {/* <Input
              className="Input"
              type="tel"
              value={phoneNumber}
              placeholder="Enter your Mobile Number"
              onChange={(e) => {
                // Only allow digits (0-9)
                const re = /^[0-9\b]+$/;
                if (re.test(e.target.value) || e.target.value === "") {
                  // Limit to 10 digits
                  setPhoneNumber(e.target.value.slice(0, 10));
                }
              }}
            /> */}
          {/* </div> */}
          {
            isError &&
            <MessageStatus message={message} messageType={messageType} />

          }

          <Button className="Button" onClick={handleSendOTP}>
            Send OTP
          </Button>
        </div>
      </Loginmobilewrapper>
    </>
  );
};

export default Login;
