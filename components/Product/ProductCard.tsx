import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { CartContext } from '../../contexts/CartContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import { formatCurrency } from '../../utils/formatter';
import Button from '../UI/Button';
import Card, { CardContent, CardImage, CardTitle, CardActions } from '../UI/Card';
import { ShoppingCartIcon, ShareIcon } from '../UI/Icon';
import { siteContent } from '../../data/siteContent';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Découvrez ${product.name} sur ${siteContent.appName} ! ${product.description}`,
      url: `${window.location.origin}/#/product/${product.id}` // Use HashRouter path
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotification({ message: 'Produit partagé avec succès !', type: 'success', duration: 3000 });
      } else {
        // Fallback for browsers that don't support navigator.share
        // For example, copy link to clipboard or show a message
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


  return (
    <Card className="flex flex-col h-full" hoverEffect>
      <Link to={`/product/${product.id}`} className="block group">
        <CardImage src={product.images[0]} alt={product.name} aspectRatio="aspect-[3/4]" />
      </Link>
      <CardContent className="flex-grow flex flex-col">
        <Link to={`/product/${product.id}`} className="block group">
          <CardTitle className="text-lg mb-1 truncate group-hover:text-primary-dark dark:group-hover:text-primary-light">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow">{product.description.substring(0,60)}...</p>
        <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-3">
          {formatCurrency(product.price, product.currency)}
        </p>
      </CardContent>
      <CardActions className="flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2 p-3">
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => {
            addToCart(product);
            showNotification({ message: `${product.name} ajouté au panier!`, type: 'success', duration: 2000 });
          }}
          leftIcon={<ShoppingCartIcon className="w-4 h-4" />}
          className="flex-1 sm:flex-auto" // Allow button to grow
          aria-label={`Ajouter ${product.name} au panier`}
        >
          {siteContent.product.addToCart}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          leftIcon={<ShareIcon className="w-4 h-4" />}
          className="flex-1 sm:flex-auto" // Allow button to grow
          aria-label={`Partager ${product.name}`}
        >
          Partager
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;