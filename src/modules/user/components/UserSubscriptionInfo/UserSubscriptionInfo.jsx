import React, { useEffect, useState } from 'react';
import { UserSubscriptionInfoWrapper1 } from './UserSubscriptionInfo.styles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from '../../../../api/userApi';
import { getUserSubscription } from '../../../../api/subscriptionApi';

const UserSubscriptionInfo = () => {
    const { user } = useUser();
    const [userSubscription, setUserSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const apiCaller = async () => {
            try {
                setIsLoading(true);
                if (!user) return;
                
                const userData = await getUserByClerkId(user.id);
                const userSubscriptionData = await getUserSubscription(userData.data.user._id);
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
                </div>
                <div className="subscription-upgrade-btn">
                    <button 
                        className="upgrade-button" 
                        onClick={() => navigate('/subscription')}
                    >
                        {userSubscription?.status === 'active' ? 'Manage Subscription' : 'Upgrade'}
                    </button>
                </div>
            </div>
        </UserSubscriptionInfoWrapper1>
    );
};

export default UserSubscriptionInfo;