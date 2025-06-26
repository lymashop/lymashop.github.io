
import React from 'react';
import { SearchIcon } from '../UI/Icon';
import { siteContent } from '../../data/siteContent';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        placeholder={siteContent.catalog.searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light focus:border-transparent transition-colors"
      />
    </div>
  );
};

export default SearchBar;
