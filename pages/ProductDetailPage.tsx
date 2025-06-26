import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products as allProducts } from '../data/products'; // Assuming products are statically defined
import { Product } from '../types';
import { CartContext } from '../contexts/CartContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { formatCurrency } from '../utils/formatter';
import Button from '../components/UI/Button';
import ProductCard from '../components/Product/ProductCard';
import NotFoundPage from './NotFoundPage'; // For when product not found
import { ShoppingCartIcon, PlusIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon, ShareIcon } from '../components/UI/Icon';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { siteContent } from '../data/siteContent';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined for loading, null for not found
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate API call or data fetching
    const foundProduct = allProducts.find((p) => p.id === id);
    setProduct(foundProduct || null); // Set to null if not found
    
    if (foundProduct) {
        document.title = `${foundProduct.name} - ${siteContent.appName}`;
        const metaDescTag = document.querySelector('meta[name="description"]');
        if (metaDescTag) {
          metaDescTag.setAttribute('content', foundProduct.longDescription?.substring(0,160) || foundProduct.description.substring(0,160) + "...");
        }
    } else {
        document.title = `${siteContent.product.productNotFound} - ${siteContent.appName}`;
    }

    // Reset quantity and image index when product changes
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [id]);

  if (product === undefined) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner text="Chargement du produit..." /></div>;
  }

  if (!product) {
    return <NotFoundPage />;
  }
  
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification({ message: `${product.name} (x${quantity}) ajouté au panier!`, type: 'success', duration: 3000 });
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Découvrez ${product.name} sur ${siteContent.appName} ! ${product.longDescription || product.description}`,
      url: window.location.href // Product page URL
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
         showNotification({ message: 'Produit partagé avec succès !', type: 'success', duration: 3000 });
      } else {
        navigator.clipboard.writeText(shareData.url).then(() => {
          showNotification({ message: 'Lien du produit copié dans le presse-papiers !', type: 'info', duration: 3000 });
        }).catch(() => {
          showNotification({ message: 'Le partage n\'est pas supporté ou a échoué.', type: 'warning', duration: 3000 });
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showNotification({ message: 'Erreur lors du partage.', type: 'error', duration: 3000 });
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.longDescription || product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": product.currency === "FCFA" ? "XOF" : product.currency,
      "price": product.price,
      "availability": product.stock && product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "brand": {
      "@type": "Brand",
      "name": "Lyma Shop"
    },
    ...(product.rating && product.reviews && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toString(),
        "reviewCount": product.reviews.toString()
      }
    })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Product Images */}
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 md:aspect-w-3 md:aspect-h-4 rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-800">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          {product.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 p-2 rounded-full shadow-md"
                aria-label="Image précédente"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 p-2 rounded-full shadow-md"
                aria-label="Image suivante"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-primary-dark dark:bg-primary-light' : 'bg-gray-300 dark:bg-slate-600'} hover:bg-primary-dark/70 dark:hover:bg-primary-light/70 transition-colors`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
           {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.images.map((imgSrc, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary-dark dark:border-primary-light' : 'border-transparent hover:border-gray-300 dark:hover:border-slate-600'}`}
                    >
                        <img src={imgSrc} alt={`${product.name} thumbnail ${index+1}`} className="w-full h-full object-cover"/>
                    </button>
                ))}
            </div>
           )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-gray-900 dark:text-slate-100">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating!)} ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118l-3.387-2.461a1 1 0 00-1.175 0l-3.387 2.461c-.784.57-1.838-.197-1.539-1.118l1.287-3.973a1 1 0 00-.364-1.118L2.04 9.399c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-500 dark:text-slate-400">({product.reviews} avis)</span>
            </div>
          )}

          <p className="text-3xl font-semibold text-primary-dark dark:text-primary-light">
            {formatCurrency(product.price, product.currency)}
          </p>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-slate-300">
            <h2 className="text-xl font-semibold mb-2">{siteContent.product.details}</h2>
            <p>{product.longDescription || product.description}</p>
          </div>
          
          {product.tags && product.tags.length > 0 && (
             <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary-light dark:bg-slate-700 text-primary-dark dark:text-primary-light rounded-full">{tag}</span>
                ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Quantité:</span>
            <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-md">
              <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="px-3 py-1 rounded-r-none border-r dark:border-slate-600" aria-label="Réduire la quantité">
                <MinusIcon className="w-4 h-4" />
              </Button>
              <span className="px-4 py-1 text-center w-12 tabular-nums">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} className="px-3 py-1 rounded-l-none border-l dark:border-slate-600" aria-label="Augmenter la quantité">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleAddToCart}
              leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
              className="flex-1 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {siteContent.product.addToCart}
            </Button>
             <Button 
              variant="outline" 
              size="lg" 
              onClick={handleShare}
              leftIcon={<ShareIcon className="w-5 h-5" />}
              className="flex-1"
              aria-label={siteContent.product.shareProduct}
            >
              Partager
            </Button>
          </div>


          {product.stock && product.stock < 10 && product.stock > 0 && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Attention : Plus que {product.stock} articles en stock !</p>
          )}
           {product.stock === 0 && (
            <p className="text-sm text-red-600 dark:text-red-400">Cet article est actuellement en rupture de stock.</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-slate-100">
            {siteContent.product.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
      
      <div className="mt-12 text-center">
        <Link to="/catalog" className="text-primary-dark dark:text-primary-light hover:underline">
          &larr; Retour au catalogue
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;