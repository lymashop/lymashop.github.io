
import React, { useState, ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './Icon';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpenDefault?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-gray-200 dark:border-slate-700">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 px-1 sm:px-3 text-left font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-dark focus-visible:ring-opacity-75 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="text-lg">{title}</span>
          {isOpen ? <ChevronUpIcon className="w-6 h-6 text-primary-dark dark:text-primary-light" /> : <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />}
        </button>
      </h2>
      {isOpen && (
        <div className="py-5 px-1 sm:px-3">
          <div className="text-gray-600 dark:text-slate-300 prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
    children: ReactNode;
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ children, className }) => {
    return <div className={`space-y-0 ${className}`}>{children}</div>;
}

export default Accordion;
