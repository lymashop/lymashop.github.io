
import React from 'react';
import PolicyPageLayout from '../components/UI/PolicyPageLayout';
import { siteContent } from '../data/siteContent';

const PrivacyPolicyPage: React.FC = () => {
  return <PolicyPageLayout data={siteContent.privacyPolicy} />;
};

export default PrivacyPolicyPage;
