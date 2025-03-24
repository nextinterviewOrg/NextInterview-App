// AddTOTP.jsx
import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useUser } from "@clerk/clerk-react";
import { Input, notification } from "antd";

import {
  TOTPSetupContainer,
  Title,
  Description,
  QRContainer,
  SecretContainer,
  CodeInputsContainer,
  SingleCodeInput,
  ErrorMessage,
  ActionsRow,
  SecondaryButton,
} from "./AddTOTP.styles.js";

const AddTOTP = ({ onComplete }) => {
  const { user } = useUser();

  // TOTP Data
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [secret, setSecret] = useState(null);

  // 6-digit code (array of digits)
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // UI States
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or create TOTP on mount
  useEffect(() => {
    const fetchTOTP = async () => {
      setError(null);
      try {
        const response = await user.createTOTP();
        console.log("res", response);
        setQrCodeUrl(response.uri);
        setSecret(response.secret);
      } catch (err) {
        console.error("TOTP creation error:", err,"kjjkdbsjbj",err.errors[0].message);
        if (err.errors && err.errors.length > 0) {
          setError(err.errors[0].message);
        } else {
          setError("Failed to create TOTP");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTOTP();
  }, [user]);

  // Handle input changes for the 6 OTP digits
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return; // Only digits
    const updated = [...otpDigits];
    updated[index] = value.slice(-1); // Keep only last typed digit
    setOtpDigits(updated);

    // Auto focus next if typed
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Verify TOTP
  const handleVerify = async () => {
    const code = otpDigits.join("");
    if (!secret || code.length < 6) {
      setError("Please enter all 6 digits from your authenticator.");
      return;
    }
    setError(null);

    try {
      const result = await user.verifyTOTP({ secret, code });
      if (result) {
        // alert("TOTP setup successful!");
        notification.success({
          message: "Success",  // Title of the notification
          description: "OTP has been verified successfully!",  // Description of the notification
          placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
          duration: 3,
        })
        onComplete && onComplete(); // Notify parent
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Incorrect or expired code. Please try again.");
    }
  };

  // Regenerate TOTP: disable + create a fresh one
  const handleRegenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      await user.disableTOTP();
      const newResponse = await user.createTOTP();
      setQrCodeUrl(newResponse.uri);
      setSecret(newResponse.secret);
      setOtpDigits(["", "", "", "", "", ""]);
      notification.success({
        message: "Success",  // Title of the notification
        description: "QR code regenerated. Please scan again.",  // Description of the notification
        placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
        duration: 3,
      })
      // alert("QR code regenerated. Please scan again.");
    } catch (err) {
      console.error("Error regenerating TOTP:", err);
      setError("Failed to regenerate TOTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading TOTP...</p>;
  }

  return (
    <TOTPSetupContainer>
      <Title>Set up Authenticator App</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {qrCodeUrl && (
        <>
          <Description>
            Scan this QR code using your preferred authenticator app (e.g.,
            Google Authenticator, Authy).
          </Description>

          <QRContainer>
            <QRCodeSVG value={qrCodeUrl} size={160} />
          </QRContainer>
        </>
      )}

      {secret && (
        <>
          <Description>
            If you can't scan the QR code, manually enter this secret key:
          </Description>
          <SecretContainer>
            {secret}
            <button
              onClick={() => {
                navigator.clipboard.writeText(secret);
                notification.success({
                  message: "Success",  // Title of the notification
                  description: "Secret copied to clipboard.",  // Description of the notification
                  placement: "topRight",  // Where the notification will appear (topRight, bottomRight, etc.)
                  duration: 3,
                })
                // alert("Secret copied to clipboard.");
              }}
            >
              Copy
            </button>
          </SecretContainer>
        </>
      )}
      {error !== "TOTP already enabled" ? <>
        <Description>Enter the 6-digit code from your authenticator app:</Description>
        <CodeInputsContainer>
          {otpDigits.map((digit, idx) => (
            <SingleCodeInput
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputRefs.current[idx] = el)}
            />
          ))}
        </CodeInputsContainer>

        <ActionsRow>
          <SecondaryButton type="button" onClick={handleRegenerate}>
            Regenerate QR
          </SecondaryButton>
          <button type="button" onClick={handleVerify}>
            Verify
          </button>
        </ActionsRow>
      </> :
        <></>
      }

    </TOTPSetupContainer>
  );
};

export default AddTOTP;
