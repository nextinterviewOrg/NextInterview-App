// src/pages/OAuthCallback.jsx
import { useEffect } from 'react';
import { useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { isLoaded: clerkLoaded } = useClerk();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        navigate("/login",{
            state: {
                errorMessage: "Account does not exist. Please sign up first." 
            }
        })
      } catch (error) {
        // 3. Handle specific errors
        
      }
    };

    handleCallback();
  }, []);

  return <div>Authenticating...</div>;
};

export default OAuthCallback;