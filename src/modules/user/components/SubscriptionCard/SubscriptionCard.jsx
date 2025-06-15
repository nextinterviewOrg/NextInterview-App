import React from 'react';
import { SubscriptionCardWrapper } from './SubscriptionCard.styles';
import SubscribeButton from '../../../../pages/RazorpaySubscribeButton/SubscribeButton';


const SubscriptionCard = ({ title, currency
    , duration, price, interval, features, isSuggested, onSubscribe, planId, showSubscription, handleUnsubscribe, currentPlanId }) => {

    return (
        <SubscriptionCardWrapper>
            <div className={`subscription-card`}>
                {(isSuggested && currentPlanId === planId) && <div className="suggested-badge">Active Plan</div>}
                <div className="subscription-card-header">
                    <h1 className='subscription-card-header-title' style={{ color: "black", fontWeight: "bold", textDecoration: "Capitalize" }}>{title}</h1>
                    <h2 className='subscription-card-header-title'>{interval}</h2>
                </div>
                <div className="subscription-card-body">
                    <h3 className='subscription-card-body-price'>{currency} {" "}
                        {price}</h3>
                    <ul className="features-list">
                        {features.map((feature, index) => (
                            <li key={index}>
                                <span className="check-mark">✔</span> {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="subscription-card-footer">
                    {/* <SubscribeButton/> */}
                    {
                        (showSubscription) ?
                            <> {
                                currentPlanId === planId ?
                                    <button className="subscribe-button" onClick={handleUnsubscribe} style={{ backgroundColor: "#DA2C43" }}>
                                        Cancel Subscription
                                    </button>
                                    :
                                    <>
                                        <button className="subscribe-button" onClick={handleUnsubscribe}>
                                            <div style={{ display: "none" }}>
                                                <SubscribeButton planId={planId} />

                                            </div>
                                            Subscipe to this plan
                                        </button>

                                    </>

                            }

                            </>

                            :
                            <SubscribeButton planId={planId} />


                    }

                </div>
            </div>
        </SubscriptionCardWrapper>
    );
};

export default SubscriptionCard;