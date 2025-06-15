import React, { useEffect, useState } from "react";
import { UserSubscriptionWrapper } from "./SubscriptionPage.styles";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import {
    cancelSubscription,
    getAllSubscription,
    getUserSubscription
} from "../../../../api/subscriptionApi";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../../../api/userApi";
import { useClerk } from "@clerk/clerk-react";
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
                console.error(err);
                setError("Failed to load subscription data");
            } finally {
                setIsLoading(false);
            }
        };

        apiCaller();
    }, [user, action]);

    const handleSubscribe = (Id) => {
        alert("Subscribed!");
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
                                key={cardData.razorpay_plan_id || index}
                                planId={cardData.razorpay_plan_id}
                                currentPlanId={userSubscription?.plan?.isActive ?
                                    userSubscription.plan.razorpay_plan_id : ""}
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