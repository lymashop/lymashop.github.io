
import React from 'react';
import PolicyPageLayout from '../components/UI/PolicyPageLayout';
import { siteContent } from '../data/siteContent';

const ShippingPolicyPage: React.FC = () => {
  return <PolicyPageLayout data={siteContent.shippingPolicy} />;
};

export default ShippingPolicyPage;
