
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { siteContent } from '../data/siteContent';
import { ExclamationTriangleIcon } from '../components/UI/Icon';

const OfflinePage: React.FC = () => {
  const { offline } = siteContent;
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <ExclamationTriangleIcon className="w-20 h-20 text-yellow-500 dark:text-yellow-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{offline.title}</h1>
      <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-md">
        {offline.message}
      </p>
      <p className="text-md text-gray-500 dark:text-slate-400 mb-10 max-w-md">
        {offline.checkConnection}
      </p>
      <Button variant="primary" size="lg" onClick={() => window.location.reload()}>
        Réessayer de charger
      </Button>
      <Link to="/" className="mt-4 text-sm text-primary-dark dark:text-primary-light hover:underline">
        Retour à l'accueil (si mis en cache)
      </Link>
    </div>
  );
};

export default OfflinePage;
