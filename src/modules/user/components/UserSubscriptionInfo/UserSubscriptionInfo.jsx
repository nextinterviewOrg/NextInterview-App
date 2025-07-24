import React, { useEffect, useState } from 'react';
import { UserSubscriptionInfoWrapper1 } from './UserSubscriptionInfo.styles';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';
import { getUserSubscription } from '../../../../api/subscriptionApi';
import SubsSubscriptionPage from '../../pages/SubscriptionPage/SubscriptionPage';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import {
    cancelSubscription,
    getAllSubscription,
    upgradeSubscription 
} from "../../../../api/subscriptionApi";

const UserSubscriptionInfo = () => {
    const { user } = useUser();
    const [userSubscription, setUserSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

       const [subscriptionPlan, setSubscriptionPlan] = useState([]);
        const [userId, setUserId] = useState(null);
        const [error, setError] = useState(null);
        const { signOut } = useClerk();
        const [action, setAction] = useState(false);
useEffect(() => {
    const apiCaller = async () => {
        try {
            setIsLoading(true);
            if (!user) return;

            const [Plans, userData] = await Promise.all([
                getAllSubscription(),
                getUserByClerkId(user.id)
            ]);

            console.log("📦 Subscription Plans from getAllSubscription:", Plans); // ✅ Console added here

            setUserId(userData?.data?.user?._id);

            if (userData?.data?.user?._id) {
                const userSubscriptionData = await getUserSubscription(userData.data.user._id);
                setUserSubscription(userSubscriptionData);
            }

            setSubscriptionPlan(Plans.plans || []);
        } catch (err) {
            console.error("❌ Error in apiCaller:", err);
            setError("Failed to load subscription data");
        } finally {
            setIsLoading(false);
        }
    };

    apiCaller();
}, [user, action]);

    
const handleSubscribe = async (planId) => {
  try {
    const apiKey = process.env.VITE_RAPID_API_KEY;
    if (!apiKey) {
      console.error("API key not found in environment variables.");
      return;
    }

    if (!userId) throw new Error("User not found");
    if (!planId) throw new Error("Plan ID missing");

    // Optional: Call external API like Judge0 (if needed)
    // await axios.post("https://judge0-extra-ce.p.rapidapi.com/submissions", {
    //   /* your payload */
    // }, {
    //   headers: {
    //     'X-RapidAPI-Key': apiKey,
    //     'X-RapidAPI-Host': 'judge0-extra-ce.p.rapidapi.com',
    //     'Content-Type': 'application/json',
    //   },
    // });

    // Upgrade subscription
    const response = await upgradeSubscription(userId, planId);
    if (response?.success) {
      alert("Subscribed successfully!");
      setAction(prev => !prev); // triggers re-fetch
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

    useEffect(() => {
        const apiCaller = async () => {
            try {
                setIsLoading(true);
                if (!user) return;
                
                const userData = await getUserByClerkId(user.id);
                const userSubscriptionData = await getUserSubscription(userData.data.user._id);
                console.log("userSubscriptionData", userSubscriptionData);
                setUserSubscription(userSubscriptionData);
            } catch (error) {
                console.error("Error fetching subscription data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        apiCaller();
    }, [user]);

    // Format date from timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return <div>Loading subscription information...</div>;
    }

    if (!userSubscription) {
        return <div>No active subscription found</div>;
    }

    return (
        <UserSubscriptionInfoWrapper1>
            <div className="subscription-container2">
                <h2 className="subscription-title">Subscription info</h2>
                {userSubscription?.status !== 'active' ? (
                    <div className='subscriptionCardContainer'>
{subscriptionPlan.map((cardData, index) => (
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

                ) : (
                <div className="subscription-details">
                    <div className="detail-item">
                        <span className='detail-item-title'>Subscription Plan</span> 
                        <span className='detail-item-value'>{userSubscription?.plan?.name || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                        <span className='detail-item-title'>Amount Paid</span> 
                        <span className='detail-item-value'>
                            {userSubscription?.plan?.amount ? `Rs. ${userSubscription.plan.amount}` : 'N/A'}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className='detail-item-title'>Purchase Date</span> 
                        <span className='detail-item-value'>
                            {formatDate(userSubscription?.subscription?.start_at)}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className='detail-item-title'>Plan End Date</span> 
                        <span className='detail-item-value'>
                            {formatDate(userSubscription?.subscription?.end_at)}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className='detail-item-title'>Frequency</span> 
                        <span className='detail-item-value'>
                            {userSubscription?.plan?.interval ? 
                                `${userSubscription.plan.interval.charAt(0).toUpperCase()}${userSubscription.plan.interval.slice(1)}` : 
                                'N/A'}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className='detail-item-title'>Status</span> 
                        <span className='detail-item-value' style={{
                            color: userSubscription?.status === 'active' ? 'green' : 'red',
                            fontWeight: 'bold'
                        }}>
                            {userSubscription?.status ? 
                                `${userSubscription.status.charAt(0).toUpperCase()}${userSubscription.status.slice(1)}` : 
                                'N/A'}
                        </span>
                    </div>
                </div> )}
                <div className="subscription-upgrade-btn">
                    <button 
                        className="upgrade-button" 
                        onClick={() => navigate('/user/subscription')}
                    >
                        {userSubscription?.status === 'active' ? 'Manage Subscription' : 'Upgrade'}
                    </button>
                </div>
            </div>
        </UserSubscriptionInfoWrapper1>
    );
};

export default UserSubscriptionInfo;