import React, { useEffect, useState } from "react";
import { UserSubscriptiontt } from "./UserSubscription.styles";
import SubscriptionCard from "../../components/SubscriptionCard/SubscriptionCard";
import { getAllSubscription } from "../../../../api/subscriptionApi";

export default function UserSubscription() {
  const [subscriptionPlan, setSubscriptionPlan] = useState([]);
  useEffect(() => {
    const apiCaller = async () => {
      const Plans = await getAllSubscription();
      console.log(Plans);
      setSubscriptionPlan(Plans.plans);
    }
    apiCaller();

  }, []);
  const handleSubscribe = () => {
    alert("Subscribed!");
  };
 

  return (
    <UserSubscriptiontt>
      <div className="subscriptionCardContainer">
        {subscriptionPlan.length > 0 && subscriptionPlan.map((cardData, index) =>{
          console.log("cardData", cardData);
          return  (
          <SubscriptionCard
            key={index}
            title={cardData?.name}
            duration={cardData?.duration}
            price={cardData.amount}
            interval={cardData.interval}
            currency={cardData.currency}
            features={cardData.features}
            isSuggested={false}
            onSubscribe={handleSubscribe}
          />
        )
        })}
      </div>
    </UserSubscriptiontt>
  );
}
