import React from 'react';
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

const plans = [
  {
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
  return (
    <>
    <LandingHeader />
    <Wrapper>
      <Title>Pricing</Title>
      <SubTitle>Here is a small description, lorem ipsum dolor sit amet, consectetur.</SubTitle>
      <Subscription>Subscription to access all features</Subscription>
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard key={index} suggested={plan.suggested}>
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
      <ContinueButton>Continue</ContinueButton>
    </Wrapper>
    <LandingFooter />
    </>
  );
};

export default Pricing;
