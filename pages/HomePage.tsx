
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products'; // Sample products
import { siteContent } from '../data/siteContent';
import { ArrowPathIcon } from '../components/UI/Icon'; // Using ArrowPathIcon as a generic "go to" icon

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4); // Display first 4 products as featured

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-primary-light via-purple-400 to-pink-400 dark:from-primary-darker dark:via-purple-700 dark:to-pink-700 text-white py-20 md:py-32 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src={siteContent.home.heroImageUrl} 
            alt="Lyma Shop Hero" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-black/10"></div> {/* Reduced Dark overlay */}
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-6 drop-shadow-lg">
            {siteContent.home.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md">
            {siteContent.home.heroSubtitle}
          </p>
          <Link to="/catalog">
            <Button variant="secondary" size="lg" className="bg-white text-primary-dark hover:bg-opacity-90 dark:bg-slate-100 dark:text-primary-darker dark:hover:bg-opacity-90 shadow-lg" rightIcon={<ArrowPathIcon className="w-5 h-5"/>}>
              {siteContent.home.heroCta}
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800 dark:text-slate-100">
          {siteContent.home.featuredProductsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button variant="outline" size="md">
              Voir tous les produits
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action / Info Section (Optional) */}
      <section className="bg-secondary-light dark:bg-slate-800 p-8 md:p-12 rounded-lg text-center">
        <h3 className="text-2xl font-semibold text-primary-dark dark:text-primary-light mb-4">Prêt à redéfinir votre style ?</h3>
        <p className="text-gray-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
          Chez Lyma Shop, nous sélectionnons avec soin des pièces uniques pour vous aider à exprimer votre personnalité. Qualité, tendance et service client exceptionnel sont nos promesses.
        </p>
        <div className="space-x-4">
          <Link to="/about">
            <Button variant="primary">En savoir plus</Button>
          </Link>
          <Link to="/faq">
            <Button variant="secondary">Consulter la FAQ</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
