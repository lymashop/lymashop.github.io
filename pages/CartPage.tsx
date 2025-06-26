
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { formatCurrency } from '../utils/formatter';
import Button from '../components/UI/Button';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingCartIcon, WhatsAppIcon } from '../components/UI/Icon';
import { siteContent } from '../data/siteContent';
import { CONTACT_WHATSAPP_NUMBER } from '../constants';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getItemCount, clearCart } = useContext(CartContext);
  const totalItems = getItemCount();
  const cartTotal = getCartTotal();

  const handleOrderViaWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = "Bonjour Lyma Shop, je souhaite passer la commande suivante :\n\n";
    cartItems.forEach(item => {
      message += `* ${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity, item.currency)}\n`;
    });
    message += `\n*Total de la commande : ${formatCurrency(cartTotal, cartItems[0]?.currency || 'FCFA')}*\n\n`;
    message += "Merci de me confirmer la disponibilité et les modalités de paiement et livraison.";

    const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (totalItems === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCartIcon className="w-24 h-24 mx-auto text-gray-300 dark:text-slate-600 mb-6" />
        <h1 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-slate-100">{siteContent.cart.title}</h1>
        <p className="text-gray-600 dark:text-slate-300 mb-8">{siteContent.cart.emptyCartMessage}</p>
        <Link to="/catalog">
          <Button variant="primary" size="lg">Explorer les Produits</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-slate-100">{siteContent.cart.title} ({totalItems})</h1>
            {cartItems.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearCart} leftIcon={<TrashIcon className="w-4 h-4"/>}>
                    Vider le panier
                </Button>
            )}
          </div>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md" />
                </Link>
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item.id}`} className="hover:text-primary-dark dark:hover:text-primary-light">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-slate-100">{item.name}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{item.category}</p>
                  <p className="text-md font-semibold text-primary-dark dark:text-primary-light mt-1">
                    {formatCurrency(item.price, item.currency)}
                  </p>
                </div>
                <div className="flex items-center space-x-3 my-2 sm:my-0">
                  <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Réduire la quantité">
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">{item.quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter la quantité">
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-md font-semibold text-gray-800 dark:text-slate-100 w-24 text-center sm:text-right">
                  {formatCurrency(item.price * item.quantity, item.currency)}
                </div>
                <Button variant="ghost" onClick={() => removeFromCart(item.id)} aria-label={siteContent.cart.removeItemLabel} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2">
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 pb-3 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100">
              {siteContent.cart.summaryTitle}
            </h2>
            <div className="space-y-3 mb-6 text-gray-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span>{siteContent.cart.subtotal} ({totalItems} articles)</span>
                <span>{formatCurrency(cartTotal, cartItems[0]?.currency || 'FCFA')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frais de livraison</span>
                <span>À calculer</span>
              </div>
              {/* Add discount/promo code section here if needed */}
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-100">
                <span>{siteContent.cart.total}</span>
                <span>{formatCurrency(cartTotal, cartItems[0]?.currency || 'FCFA')}</span>
              </div>
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleOrderViaWhatsApp} 
              fullWidth
              className="bg-green-500 hover:bg-green-600 focus:ring-green-600 text-white"
              leftIcon={<WhatsAppIcon className="w-5 h-5"/>}
            >
              {siteContent.cart.orderButton}
            </Button>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 text-center">
              Vous serez redirigé vers WhatsApp pour finaliser votre commande.
            </p>
            <div className="mt-8 text-center">
                <Link to="/catalog" className="text-sm text-primary-dark dark:text-primary-light hover:underline">
                    &larr; Continuer les achats
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
