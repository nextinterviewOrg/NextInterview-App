import React, { useEffect, useState } from "react";
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
} from "../SignUp/SignUp.styles";
import signup from "../../assets/login&signupimage.svg";
import google from "../../assets/google.png";
import { Link, useLocation, useNavigate } from "react-router";
import { FaLinkedin } from "react-icons/fa";
import { SignIn, SignUpButton, useSignIn, useSignUp, useUser,useClerk  } from "@clerk/clerk-react";
import { Clerk } from '@clerk/clerk-js'
import { PiEyeLight } from "react-icons/pi";
import { IoEyeOffOutline } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";
// Import the new header component
import HeaderWithLogo from "../../components/HeaderWithLogo/HeaderWithLogo";
import MessageStatus from "../MessageStatus/MessageStatus";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // Message to show
  const [messageType, setMessageType] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const [isError, setIsError] = useState(false);
  const location = useLocation();
 
  useEffect(() => {
    console.log("location", location);
    
    if (location.state?.errorMessage) {
      setIsError(true);
      setMessage(location.state.errorMessage);
      setMessageType("error");
      
      // Clear state after displaying the message
      window.history.replaceState({}, document.title);
    }
  }, [location]);

// useEffect(() => {
//   if (location.state?.errorMessage) {
//     setIsError(true);
//     setMessage(location.state.errorMessage);
//     setMessageType("error");
//     // Clear state after displaying
//     // window.history.replaceState({}, document.title);
//   }
// }, [location.state]);
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const navigate = useNavigate();

  /**
   * Toggles the visibility of the password field.
   * @returns {void}
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    setIsError(false);
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
    }

    if (!email || !password) {
      setMessage("Please fill in all fields.");
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
        identifier: email,
        strategy: "password",
        password: password,
      });
      console.log("data", data);

      if (data.status === "complete") {
        const data2 = await setActive({ session: data.createdSessionId })
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        navigate("/validation", {
          state: { sessionId: data.createdSessionId },
        })
      } else if (data.status === "needs_second_factor") {
        navigate("/verifytotp");
      }
    } catch (error) {
      console.log("error", error)
      setIsError(true);

      if (error?.errors[0]?.code == "form_identifier_not_found") {
        setMessage("Couldn't find your account.");
      }
      else if (error?.errors[0]?.code == "session_exists") {
        setMessage("You're currently in single session mode. You can only be signed into one account at a time.");
      }
      else if (error?.errors[0]?.code == "form_param_format_invalid") {
        setMessage("Invalid Email ");
      }
      else if (error?.errors[0]?.code == "form_password_incorrect") {
        setMessage("Password is incorrect. Try again, or use another method. ");
      } else if (error?.errors[0]?.code == "user_locked") {
        setMessage("Your account has been Restricted. For more information, please contact support:-");
      }
      setMessageType("error");
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/oauth-callback", // Optional
        redirectUrlComplete: "/validation",// Where to go after successful sign-up
      });
      console.log("data", data);
    } catch (err) {
      console.error("Google Sign-Up Error:", err);

      // Check if the error indicates that the account does not exist
      if (err.errors && err.errors.some(error => error.message.includes("Account not found"))) {
        setMessage("Account does not exist. Please sign up first.");
        setMessageType("error");
      } else {
        setMessage(
          "Google sign-up failed. " +
          (err.errors?.[0]?.message || "Please try again.")
        );
        setMessageType("error");
      }
    }
  };


  const handleLinkedInSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn.authenticateWithRedirect({
        strategy: "oauth_linkedin_oidc",
        redirectUrl: window.location.origin + "/login",
        redirectUrlComplete: window.location.origin + "/validation",
      });
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
      {/* <UserProfile /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormSection>
          <Heading>Welcome to Next Interview</Heading>
          <Form onSubmit={handleFormSubmit}>
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
                    right: "6px",
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

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {/* <label htmlFor="rememberMe" style={{ fontSize: '0.9rem' }}>
                <input id="rememberMe" type="checkbox" /> Remember Me
              </label> */}
              <Link
                to="/forgotpassword"
                style={{
                  color: "#007bff",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                Forgot Password ?
              </Link>
            </div>
            {isError &&
              <MessageStatus message={message} messageType={messageType} />
            }

            <Button message={!!message} type="submit">
              Log In
            </Button>

            <AlternativeLogin>
              <Link
                to="/loginPhone"
                state={{ flow: "SIGN_IN" }}
                style={{ textDecoration: "none" }}
              >
                <button>
                  <CiMobile1 /> Log in with Mobile
                </button>
              </Link>
              <button onClick={handleGoogleSignIn}>
                <img
                  src={google}
                  alt="Google Logo"
                  style={{ height: "20px", marginRight: "10px" }}
                />
                Log in with Google
              </button>
            </AlternativeLogin>

            <LinkedInButton>
              <button onClick={handleLinkedInSignIn}>
                <FaLinkedin style={{ color: "#0076B2" }} /> Log in with LinkedIn
              </button>
            </LinkedInButton>
          </Form>
          <Footer style={{ fontSize: "14px" }}>
            Don't have an account? Sign up now. {" "}
            <a href="/signup">Signup </a>
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
export default SignUp;
