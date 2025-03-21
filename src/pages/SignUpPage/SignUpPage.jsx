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
} from "@clerk/clerk-react";
import MessageStatus from "../MessageStatus/MessageStatus";

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
    e.preventDefault();
    const fullPhoneNumber = `+91${phoneNumber.trim()}`;

    if (!email || !password || !phoneNumber) {
      setMessage("Please fill in all fields.");
      setMessageType("warning");
      return;
    }

    if (phoneNumber.trim().length !== 10) {
      setMessage("Please enter a valid 10-digit phone number.");
      setMessageType("error");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
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
      // setTimeout(
      //   () =>
      //     navigate("/verifytotp", {
      //       state: {
      //         flow: "SIGN_UP",
      //         phoneNumber: fullPhoneNumber,
      //         email: email,
      //       },
      //     }),
      //   5000
      // );
      navigate("/otp", {
        state: { flow: "SIGN_UP", phoneNumber: fullPhoneNumber, email: email },
      });
    } catch (err) {
      console.error("Sign-up Error:", err);

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

      setMessage("Sign-up failed. Please try again.");
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
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      setMessage("Google sign-up failed. Check console for details.");
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
      <UserButton />
      {/* <SignIn/> */}
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
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d{10}"
                placeholder="Enter your phone number"
                value={phoneNumber}
                maxLength={10}
                onChange={(e) => {
                  const onlyNumbers = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setPhoneNumber(onlyNumbers);
                }}
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

          <Footer>
            By signing in, I agree to Next Interview's{" "}
            <a href="/privacy-policy">Privacy Policy </a>
            and <a href="/terms">Terms of Service</a>.
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
