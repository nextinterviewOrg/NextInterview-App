import React, { useEffect, useState } from "react";
import { UserSubscriptionWrapper } from "./SubscriptionPage.styles";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import {
    cancelSubscription,
    getAllSubscription,
    getUserSubscription,
    upgradeSubscription
} from "../../../../api/subscriptionApi";
import { useUser, useClerk } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
    const [subscriptionPlan, setSubscriptionPlan] = useState([]);
    const [userSubscription, setUserSubscription] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const { signOut } = useClerk();
    const [action, setAction] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (!user) return;

                const [plansResponse, userResponse] = await Promise.all([
                    getAllSubscription(),
                    getUserByClerkId(user.id)
                ]);

                // Filter only active plans
                const activePlans = (plansResponse.plans || []).filter(plan => plan.isActive);
                setSubscriptionPlan(activePlans);

                if (userResponse?.data?.user?._id) {
                    setUserId(userResponse.data.user._id);
                    const subscriptionResponse = await getUserSubscription(userResponse.data.user._id);
                    setUserSubscription(subscriptionResponse);
                }
            } catch (err) {
                console.error("Failed to load subscription data:", err);
                setError("Failed to load subscription data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, action]);

    const handleSubscribe = async (planId) => {
        try {
            console.log("Attempting subscription with plan:", planId);
            
            // Validate plan exists and is active
            const selectedPlan = subscriptionPlan.find(plan => 
                plan.razorpay_plan_id === planId && plan.isActive
            );
            
            if (!selectedPlan) {
                throw new Error("Selected plan is not available or inactive");
            }

            if (!userId) throw new Error("User not found");
            
            const response = await upgradeSubscription(userId, planId);
            console.log("Subscription response:", response);

            if (response?.success) {
                alert("Subscription upgraded successfully!");
                setAction(prev => !prev); // Trigger re-fetch
                navigate("/user/subscription"); // Redirect to subscription info
            } else {
                throw new Error(response?.message || "Failed to process subscription");
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert(error.response?.data?.message || error.message || "Subscription failed. Please try again.");
        }
    };

    const handleUnsubscribe = async () => {
        try {
            if (!userId) return;
            
            const confirmCancel = window.confirm("Are you sure you want to cancel your subscription?");
            if (!confirmCancel) return;

            const response = await cancelSubscription(userId);
            if (response?.success) {
                alert("Subscription cancelled successfully");
                setAction(prev => !prev); // Trigger re-fetch
            } else {
                throw new Error(response?.message || "Failed to cancel subscription");
            }
        } catch (err) {
            console.error("Cancellation error:", err);
            alert(err.response?.data?.message || err.message || "Failed to cancel subscription");
        }
    };

    if (isLoading) {
        return <div className="loading">Loading subscription information...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <UserSubscriptionWrapper>
                <div className="subscription-header">
                    <h2>Available Subscription Plans</h2>
                    {userSubscription?.status === "active" && (
                        <p className="current-plan">Your current plan: {userSubscription.plan?.name}</p>
                    )}
                </div>

                <div className="subscriptionCardContainer">
                    {subscriptionPlan.length > 0 ? (
                        subscriptionPlan.map((cardData) => (
                            <SubscriptionCard
                                key={cardData._id}
                                planId={cardData._id}
                                currentPlanId={userSubscription?.plan?._id || ""}
                                title={cardData.name}
                                price={cardData.amount}
                                interval={cardData.interval}
                                currency={cardData.currency}
                                features={cardData.features || []}
                                isActive={cardData.isActive}
                                isCurrentPlan={
                                    userSubscription?.status === "active" && 
                                    userSubscription.plan?.razorpay_plan_id === cardData.razorpay_plan_id
                                }
                                onSubscribe={handleSubscribe}
                                onCancel={handleUnsubscribe}
                            />
                        ))
                    ) : (
                        <div className="no-plans">No active subscription plans available</div>
                    )}
                </div>


            <div className="action-buttons">
                {userSubscription?.status === "active" ? (
                    <button
                        className="nav-button"
                        onClick={() => navigate("/user")}
                    >
                        Back to Dashboard
                    </button>
                ) : (
                    <button
                        className="nav-button"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                )}
            </div>
             </UserSubscriptionWrapper>
        </div>
                   
    );
}