import React, { useEffect, useState } from "react";
import { UserSubscriptionWrapper } from "./UserSubscription.styles";
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
  const subscriptionCardData = [
    {
      title: "Premium Plan",
      duration: "2 months",
      price: "Rs. 2,000",
      features: [
        "Complete Documentation",
        "Working Materials in Figma",
        "Email Automation",
      ],
      isSuggested: true,
    },
    {
      title: "Premium Plan",
      duration: "3 months",
      price: "Rs. 6,000",
      features: [
        "Complete Documentation",
        "Working Materials in Figma",
        "100GB Cloud Storage",
        "Email Automation",
        "Premium Support",
        "test 1",
        "test 2",
      ],
      isSuggested: true,
    },
    {
      title: "Premium Plan",
      duration: "2 months",
      price: "Rs. 4,000",
      features: [
        "Complete Documentation",
        "Working Materials in Figma",
        "50GB Cloud Storage",
        "Email Automation",
      ],
      isSuggested: false,
    },
  ];

  const planFeatures = [
    "Complete Documentation",
    "Working Materials in Figma",
    "100GB Cloud Storage",
    "Email Automation",
    "Premium Support",
  ];

  return (
    <UserSubscriptionWrapper>
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
    </UserSubscriptionWrapper>
  );
}
