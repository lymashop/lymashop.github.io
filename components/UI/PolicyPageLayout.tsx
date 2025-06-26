
import React from 'react';
import { PolicyPageContent } from '../../types';

interface PolicyPageLayoutProps {
  data: PolicyPageContent;
}

const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 dark:text-slate-100 mb-8 text-center border-b pb-4 border-gray-200 dark:border-slate-700">
          {data.title}
        </h1>
        <div 
          className="prose dark:prose-invert max-w-none text-gray-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};

export default PolicyPageLayout;
