
import React from 'react';
import PolicyPageLayout from '../components/UI/PolicyPageLayout';
import { siteContent } from '../data/siteContent';

const ReturnPolicyPage: React.FC = () => {
  return <PolicyPageLayout data={siteContent.returnPolicy} />;
};

export default ReturnPolicyPage;
