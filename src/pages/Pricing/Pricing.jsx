import React, { useState } from 'react';
import {
  Wrapper,
  Title,
  SubTitle,
  PlansContainer,
  PlanCard,
  PlanDuration,
  PlanPrice,
  FeatureList,
  FeatureItem,
  SuggestedTag,
  ContinueButton,
  Subscription
} from './Pricing.styles';
import LandingHeader from '../../components/LandingPageComponents/LandingHeader/LandingHeader';
import LandingFooter from '../../components/LandingPageComponents/LandingFooter/LandingFooter';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 1,
    duration: '1 month',
    price: 'Rs. 2,000',
    features: [
      'Complete Documentation',
      'Working Materials in Figma',
      '100GB Cloud Storage',
      'Email Automation',
      'Premium Support',
    ],
    suggested: false,
  },
  {
    id: 2,
    duration: '3 month',
    price: 'Rs. 6,000',
    features: [
      'Complete Documentation',
      'Working Materials in Figma',
      '100GB Cloud Storage',
      'Email Automation',
      'Premium Support',
    ],
    suggested: true,
  },
  {
    id: 3,
    duration: '6 month',
    price: 'Rs. 6,000',
    features: [
      'Complete Documentation',
      'Working Materials in Figma',
      '100GB Cloud Storage',
      'Email Automation',
      'Premium Support',
    ],
    suggested: false,
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  return (
    <>
      <LandingHeader />
      <Wrapper>
        <Title>Pricing</Title>
        <SubTitle>Here is a small description, lorem ipsum dolor sit amet, consectetur.</SubTitle>
        <Subscription>Subscription to access all features</Subscription>
        <PlansContainer>
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              suggested={plan.suggested}
              selected={selectedPlan === plan.id}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.suggested && <SuggestedTag>Suggested</SuggestedTag>}
              <PlanDuration>{plan.duration}</PlanDuration>
              <PlanPrice>{plan.price}</PlanPrice>
              <FeatureList>
                {plan.features.map((feature, idx) => (
                  <FeatureItem key={idx}>✓ {feature}</FeatureItem>
                ))}
              </FeatureList>
            </PlanCard>
          ))}
        </PlansContainer>
        <Link to="/signup" state={{ selectedPlan: plans.find(plan => plan.id === selectedPlan) }}>
          <ContinueButton disabled={!selectedPlan}>
            Continue
          </ContinueButton>
        </Link>
      </Wrapper>
      <LandingFooter />
    </>
  );
};

export default Pricing;