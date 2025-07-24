// components/SubscribeButton.jsx
import React, { useEffect } from "react";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};
import { useUser }
    from "@clerk/clerk-react";
import { getUserByClerkId } from "../../api/userApi";
import { createSubscription, subscriptionVerifyFrontend } from "../../api/subscriptionApi";
import { notification } from "antd";
import { Router, useNavigate } from "react-router-dom";
const SubscribeButton = ({ planId }) => {
    const { user } = useUser();
    const [User, setUser] = React.useState(null);
    const [subdcribing, setSubscribing] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserByClerkId(user.id);
                console.log(response);
                const data = response.data.user;
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [])
const handleSubscription = async () => {
    if (!User) {
        notification.error({
            message: "User not loaded",
            description: "Please wait until your user profile is loaded.",
        });
        return;
    }

    setSubscribing(true);
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
        alert("Failed to load Razorpay");
        return;
    }

    try {
        const response = await createSubscription(User._id, planId);
        const data = response;

        if (!data || !data.subscriptionId) {
            alert("Failed to initiate subscription");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            name: "Next Interview",
            description: "Subscription payment",
            subscription_id: data.subscriptionId,
            prefill: {
                name: User.user_name,
                email: User.user_email,
                contact: User.user_phone_number,
            },
            handler: async function (response) {
                const razorResponse = await subscriptionVerifyFrontend({
                    ...response,
                    userId: User._id,
                });
                if (response) {
                    notification.success({
                        message: "Success",
                        description: "Subscription successful!",
                        placement: "topRight",
                        duration: 3,
                    });
                    window.location.reload();
                    navigate("/user");
                }
            },
            theme: {
                color: "#528FF0",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Subscription error:", error);
        alert("Subscription failed");
    } finally {
        setSubscribing(false);
    }
};


    return (
        <button onClick={handleSubscription} style={{ padding: "12px 24px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px" }} disabled={subdcribing}>
            {subdcribing ? "Subscribing..." : "Subscribe Now"}
        </button>
    );
};

export default SubscribeButton;
