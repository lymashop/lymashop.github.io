
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { siteContent } from '../data/siteContent';

const NotFoundPage: React.FC = () => {
  const { notFound } = siteContent;
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <img src="https://picsum.photos/seed/404page/400/300" alt="Illustration 404" className="w-64 h-auto mb-8 rounded-lg shadow-lg opacity-80" />
      <h1 className="text-6xl font-bold text-primary-dark dark:text-primary-light mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-slate-100 mb-6">{notFound.title}</h2>
      <p className="text-lg text-gray-600 dark:text-slate-300 mb-10 max-w-md">
        {notFound.message}
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          {notFound.goHome}
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
