import React, { useEffect, useState } from "react";
import { UserSubscriptionWrapper } from "./SubscriptionPage.styles";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import {
    cancelSubscription,
    getAllSubscription,
    getUserSubscription,

} from "../../../../api/subscriptionApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { useClerk } from "@clerk/clerk-react";
import { upgradeSubscription } from "../../../../api/subscriptionApi";
import { useNavigate } from "react-router-dom";

export default function SubsSubscriptionPage() {
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
        const apiCaller = async () => {
            try {
                setIsLoading(true);
                if (!user) return;
                if (user && user.id) {
                    console.log("Clerk user ID:", user.id);
                }

                const [Plans, userData] = await Promise.all([
                    getAllSubscription(),
                    getUserByClerkId(user.id)
                ]);
                console.log("user subscription", Plans);

                setUserId(userData?.data?.user?._id);

                if (userData?.data?.user?._id) {
                    const userSubscriptionData = await getUserSubscription(userData.data.user._id);
                    console.log("user subscription", userSubscriptionData);
                    setUserSubscription(userSubscriptionData);
                }

                setSubscriptionPlan(Plans.plans || []);
            } catch (err) {
                console.error(err);
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
    if (!planId || planId === "undefined") throw new Error("Plan ID missing or invalid");

    const response = await upgradeSubscription(userId, planId);

    if (response?.success) {
      alert("Subscribed successfully!");
      setAction(prev => !prev);
    } else {
      alert(response?.message || "Failed to subscribe.");
    }
  } catch (error) {
    console.error("Subscription error:", error);
    alert(error?.response?.data?.message || error.message || "Subscription failed.");
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <UserSubscriptionWrapper>
                <div className="subscriptionCardContainer">
                    {subscriptionPlan.length > 0 ? (
                        subscriptionPlan.map((cardData, index) => (
                            <SubscriptionCard
                                key={cardData._id || index}
                                planId={cardData._id}
                                currentPlanId={userSubscription?.plan?.isActive ?
                                    userSubscription.plan._id : ""}
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
                        ))
                    ) : (
                        <div>No subscription plans available</div>
                    )}
                </div>
            </UserSubscriptionWrapper>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {
                    userSubscription?.status === "active" ?
                        <button
                            className="subscribe-button"
                            onClick={() => { navigate("/user") }}
                            style={{ marginTop: "20px", height: "40px", width: "100px", color: "white", background: "#007c91", border: "none", borderRadius: "5px" }}
                        >Home</button>

                        :
                        <button
                            className="subscribe-button"
                            onClick={() => { signOut() }}
                            style={{ marginTop: "20px", height: "40px", width: "100px", color: "white", background: "#007c91", border: "none", borderRadius: "5px" }}
                        >Logout</button>


                }

            </div>
        </div>
    );
}