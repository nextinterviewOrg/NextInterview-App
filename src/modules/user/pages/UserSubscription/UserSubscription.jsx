import React, { useEffect, useState } from "react";
import { UserSubscriptiontt, SubLogoutButton, SkipButton } from "./UserSubscription.styles";
import { useUser, useClerk } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';
import { getUserSubscription } from '../../../../api/subscriptionApi';
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import {
    cancelSubscription,
    getAllSubscription,
    upgradeSubscription 
} from "../../../../api/subscriptionApi";
import { useNavigate } from "react-router-dom";

export default function UserSubscription() {
    const [subscriptionPlan, setSubscriptionPlan] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userSubscription, setUserSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { signOut } = useClerk();
    const [action, setAction] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    // Check if skip button should be shown
    const showSkipButton = !userSubscription || 
                          userSubscription?.status === "expired" || 
                          userSubscription?.status === "cancelled";

    useEffect(() => {
        const apiCaller = async () => {
            try {
                setIsLoading(true);
                if (!user) return;

                const [Plans, userData] = await Promise.all([
                    getAllSubscription(),
                    getUserByClerkId(user.id)
                ]);

                setUserId(userData?.data?.user?._id);

                if (userData?.data?.user?._id) {
                    const userSubscriptionData = await getUserSubscription(userData.data.user._id);
                    setUserSubscription(userSubscriptionData);
                }

                setSubscriptionPlan(Plans.plans || []);
            } catch (err) {
                console.error("Error in apiCaller:", err);
                setError("Failed to load subscription data");
            } finally {
                setIsLoading(false);
            }
        };

        apiCaller();
    }, [user, action]);

    const handleSubscribe = async (planId) => {
        try {
            if (!userId) throw new Error("User not found");
            if (!planId) throw new Error("Plan ID missing");

            const response = await upgradeSubscription(userId, planId);
            if (response?.success) {
                alert("Subscribed successfully!");
                setAction(prev => !prev);
            } else {
                alert(response?.message || "Failed to subscribe.");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert(error.response?.data?.message || error.message || "Subscription failed.");
        }
    };

    const handleUnsubscribe = async () => {
        try {
            if (!userId) return;
            const response = await cancelSubscription(userId);
            if (response) {
                setAction(prev => !prev);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to cancel subscription");
        }
    };

    const handleSkip = () => {
        // Navigate to dashboard or home page
        navigate("/dashboard");
    };

    if (isLoading) {
        return <div>Loading subscription plans...</div>;
    }

    if (!userSubscription) {
        return <div>No active subscription found</div>;
    }

    return (
        <UserSubscriptiontt>
            <div className="subscriptionCardContainer">
                {subscriptionPlan.length > 0 && subscriptionPlan.map((cardData, index) => (
                    <SubscriptionCard
                        key={cardData.razorpay_plan_id || index}
                        planId={cardData.razorpay_plan_id}
                        currentPlanId={
                            userSubscription?.plan?.isActive
                                ? userSubscription.plan.razorpay_plan_id
                                : ""
                        }
                        title={cardData?.name}
                        duration={cardData?.duration}
                        price={cardData.amount}
                        interval={cardData.interval}
                        currency={cardData.currency}
                        features={cardData.features || []}
                        isSuggested={userSubscription?.status === "active"}
                        onSubscribe={handleSubscribe}
                        onCancel={handleUnsubscribe}
                        showSubscription={userSubscription?.status === "active"}
                        handleUnsubscribe={handleUnsubscribe}
                    />
                ))}
            </div>

            <div className="button-container">
                {showSkipButton && (
                    <SkipButton onClick={handleSkip}>
                        Skip for Now
                    </SkipButton>
                )}
                <SubLogoutButton onClick={() => signOut()}>
                    {isLoading ? "Loading..." : "Logout"}
                </SubLogoutButton>
            </div>
        </UserSubscriptiontt>
    );
}