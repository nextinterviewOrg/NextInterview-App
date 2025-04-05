import React, { useState } from "react";
import {
  Container,
  FormSection,
  Heading,
  Form,
  Input,
  Button,
  AlternativeLogin,
  LinkedInButton,
  Footer,
  Signupage,
  MessageCard,
} from "../SignUp/SignUp.styles";
import signup from "../../assets/login&signupimage.svg";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router";
import { FaLinkedin } from "react-icons/fa";
import { PiEyeLight } from "react-icons/pi";
import { TiWarningOutline } from "react-icons/ti";
import {
  IoEyeOffOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";


// Import the new header component
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import {
  useSignIn,
  useSignUp,
  useAuth,
  useClerk,
  UserProfile,
  UserButton,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import MessageStatus from "../MessageStatus/MessageStatus";
import PhoneInput, { getCountries, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null); // Message to show
  const [messageType, setMessageType] = useState(null);
  const navigate = useNavigate();
  const { openSignUp } = useClerk();
  const [isError, setIsError] = useState(false);

  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  // If false, user is not authenticated

  /**
   * Toggles the visibility of the password field.
   * @returns {void}
   */
  const togglePasswordVisibility = async () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    setIsError(false);
    setMessage(null);
    setMessageType(null);
    setIsError(false);
    e.preventDefault();
    const fullPhoneNumber = `${phoneNumber.trim()}`;

    if (!email || !password || !phoneNumber) {
      setIsError(true);
      setMessage("Please fill in all fields.");
      setMessageType("warning");
      return;
    }

    const isValidPhone = isValidPhoneNumber(phoneNumber);

    if (!isValidPhone) {
      setIsError(true);
      setMessage("Please enter a valid phone number.");
      setMessageType("error");
      return;
    }


    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setIsError(true);
      setMessage(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setMessageType("error");
      return;
    }

    try {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Phone Number:", fullPhoneNumber);

      const datas = await signUp.create({
        phoneNumber: fullPhoneNumber,
        password: password,
        emailAddress: email,
        phone_number: fullPhoneNumber,
        // username: username,
        email_address: email,
      });
      const userSignupData={
        phoneNumber: fullPhoneNumber,
        password: password,
        emailAddress: email,
        phone_number: fullPhoneNumber,
        // username: username,
        email_address: email,
      };
      console.log("datas", datas);
      if (datas.errors) {
        const breachedPasswordError = datas.errors.find(
          (error) => error.code === "form_password_pwned"
        );
        if (breachedPasswordError) {
          setMessage(
            "This password has been found in a data breach. Please choose a stronger password."
          );
          setMessageType("error");
          return;
        }
      }
      const data = await signUp.preparePhoneNumberVerification({
        strategy: "phone_code",
      });
      console.log("data", data);
      const data2 = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      console.log("data2", data2);
      setMessage("Registered successfully!, Please verify your phone number.");
      setMessageType("success");

      navigate("/otp", {
        state: { flow: "SIGN_UP", phoneNumber: fullPhoneNumber, email: email,data:userSignupData },
      });
    } catch (err) {
      console.error("Sign-up Error:", err);
      setIsError(true);
      console.log("Sign-in error:", err);
      if (err.errors[0].code == "form_param_format_invalid") {
        setMessage("phone_number must be a valid phone number according to E.164 international standard.");
      }
      console.log("Sign-in error: 111 ", err.errors);
      if (err.errors[0].code == "form_identifier_exists") {
        setMessage("That email address is taken. Please try another.");
      }

      if (err.errors) {
        const breachedPasswordError = err.errors.find(
          (error) => error.code === "form_password_pwned"
        );
        if (breachedPasswordError) {
          setMessage(
            "This password has been found in a data breach. Please choose a stronger password."
          );
          setMessageType("error");
          return;
        }

        const emailExistsError = err.errors.find((error) =>
          error.message.includes("email address is taken")
        );
        if (emailExistsError) {
          setMessage("Email already exists. Please try again.");
          setMessageType("warning");
          return;
        }

        const phoneExistsError = err.errors.find((error) =>
          error.message.includes("phone number is taken")
        );
        if (phoneExistsError) {
          setMessage("Phone number already exists. Please try again.");
          setMessageType("warning");
          return;
        }

      }

      // setMessage("Sign-up failed. Please try again.");
      setMessageType("error");
    }
  };
  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: window.location.origin + "/signup", // Optional
        redirectUrlComplete: window.location.origin + "/validation", // Where to go after successful sign-up
      });
      console.log("data", data);
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      if (err.code === 'authentication_failed') {
        setMessage("Authentication with Google failed. Please try again.");
      } else if (err.code === 'form_identifier_exists') {
        setMessage("An account with this Google email already exists. Please sign in instead.");
      } else {
        setMessage(err.errors[0]?.message || "An error occurred during Google sign-up. Please try again.");
      }
      // setMessage("Google sign-up failed. Check console for details.");
      setMessageType("error");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      const data = await signUp.authenticateWithRedirect({
        strategy: "oauth_linkedin_oidc",
        redirectUrl: window.location.origin + "/signup",
        redirectUrlComplete: window.location.origin + "/validation",
      });
      console.log("data", data);
    } catch (err) {
      console.error("LinkedIn Sign-Up Error:", err);
      setMessage("LinkedIn sign-up failed. Check console for details.");
      setMessageType("error");
    }
  };

  return (
    <Container>
      <HeaderWithLogo />
      {/* <UserButton /> */}
      {/* <SignUp/> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormSection>
          <Heading>Welcome to Next Interview</Heading>
          <Form onSubmit={handleFormSubmit}>
            {/* <Input>
              <label>User Name</label>
              <input
                type="text"
                placeholder="Enter your userName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Input> */}
            <Input>
              <label>Phone Number</label>
              <PhoneInput
                className="Input"
                international
                defaultCountry="IN" // Set the default country code (IN for India)
                value={phoneNumber}
                onChange={setPhoneNumber}
                error={isError}
              />

            </Input>
            <Input>
              <label>Email ID</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input>
            <Input>
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <IoEyeOffOutline
                      style={{ fontSize: "20px", marginTop: "5px" }}
                    />
                  ) : (
                    <PiEyeLight
                      style={{ fontSize: "20px", marginTop: "5px" }}
                    />
                  )}
                </button>
              </div>
            </Input>

            <MessageStatus message={message} messageType={messageType} />
            <Button message={!!message} type="submit">
              Sign Up
            </Button>

            <AlternativeLogin></AlternativeLogin>
            <AlternativeLogin>
              <button onClick={handleGoogleSignUp}>
                <img
                  src={google}
                  alt="Google Logo"
                  style={{ height: "20px", marginRight: "10px" }}
                />
                Sign up with Google
              </button>

              <LinkedInButton>
                <button onClick={handleLinkedInSignUp}>
                  <FaLinkedin style={{ color: "#0076B2" }} /> Sign up with
                  LinkedIn
                </button>
              </LinkedInButton>
            </AlternativeLogin>
          </Form>
          <Footer style={{fontSize:"14px" }}>
           Already have an account?  {" "}
            <a href="/login">Login </a>
          </Footer>

          <Footer>
            By signing in, I agree to Next Interview's{" "}
            <a href="/#">Privacy Policy </a>
            and <a href="/#">Terms of Service</a>.
          </Footer>
        </FormSection>

        <Signupage>
          <img src={signup} alt="Sign Up Illustration" />
        </Signupage>
      </div>
    </Container>
  );
};

export default SignUpPage;
