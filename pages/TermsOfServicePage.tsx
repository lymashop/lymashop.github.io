
import React from 'react';
import PolicyPageLayout from '../components/UI/PolicyPageLayout';
import { siteContent } from '../data/siteContent';

const TermsOfServicePage: React.FC = () => {
  return <PolicyPageLayout data={siteContent.terms} />;
};

export default TermsOfServicePage;
