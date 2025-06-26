
import React, { useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/Layout/MainLayout';
import { siteContent } from './data/siteContent'; // For dynamic titles
import OfflinePage from './pages/OfflinePage'; // Import the OfflinePage component
import CustomNotification from './components/UI/CustomNotification';
import { NotificationContext } from './contexts/NotificationContext';

const PageWrapper: React.FC<{ children: React.ReactNode; title?: string; description?: string }> = ({ children, title, description }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const baseTitle = "Lyma Shop";
    document.title = title ? `${title} - ${baseTitle}` : baseTitle;

    const metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', description || siteContent.metaDescription);
    }
  }, [location, title, description]);

  return <>{children}</>;
};

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { showNotification, showPWAInstallPrompt, hidePWAInstallPrompt } = useContext(NotificationContext);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#7C3AED'); // primary-darker for dark theme
    } else {
      root.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#A78BFA'); // primary-light for light theme
    }
  }, [theme]);

  // PWA Install Prompt Logic
  useEffect(() => {
    const PWA_PROMPT_DELAY = 15000; // 15 seconds
    const PWA_PROMPT_SHOWN_KEY = 'lymaShopPwaPromptShown';

    const hasBeenShown = localStorage.getItem(PWA_PROMPT_SHOWN_KEY);

    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
          console.log('App is already installed (standalone).');
          localStorage.setItem(PWA_PROMPT_SHOWN_KEY, 'true');
          return;
        }
        
        // Beforeinstallprompt event handling
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
          (window as any).deferredInstallPrompt = e; // Stash the event so it can be triggered later.
          console.log('`beforeinstallprompt` event was fired.');
          showPWAInstallPrompt(); // Show our custom PWA install UI
          localStorage.setItem(PWA_PROMPT_SHOWN_KEY, 'true'); 
        });
        
        // Fallback for browsers that don't fire beforeinstallprompt or if user dismissed it previously
        // This will just be a generic "add to homescreen" hint if the event wasn't caught
        if (!(window as any).deferredInstallPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
            showNotification({
            id: 'pwa-install-fallback',
            message: "Ajoutez Lyma Shop à votre écran d'accueil pour un accès facile !",
            type: 'info',
            duration: 10000,
            customAction: {
              label: "Comment faire ?",
              onClick: () => {
                // You could link to a help page or show a modal with instructions
                alert("Sur mobile : Appuyez sur le menu de votre navigateur (⋮ ou ...) puis cherchez 'Ajouter à l'écran d'accueil' ou 'Installer l'application'.");
                hidePWAInstallPrompt(); // Assuming this also hides generic notifications
              }
            }
          });
          localStorage.setItem(PWA_PROMPT_SHOWN_KEY, 'true');
        }

      }, PWA_PROMPT_DELAY);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPWAInstallPrompt, showNotification, hidePWAInstallPrompt]);


  const handleInstallClick = async () => {
    const deferredPrompt = (window as any).deferredInstallPrompt;
    if (!deferredPrompt) {
      alert("L'installation PWA n'est pas disponible actuellement ou l'application est déjà installée.");
      hidePWAInstallPrompt();
      return;
    }
    deferredPrompt.prompt(); // Show the install prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    (window as any).deferredInstallPrompt = null; // We've used the prompt.
    hidePWAInstallPrompt();
  };

  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PageWrapper title={siteContent.home.title} description={siteContent.home.metaDescription}><HomePage /></PageWrapper>} />
          <Route path="/catalog" element={<PageWrapper title={siteContent.catalog.title}><CatalogPage /></PageWrapper>} />
          <Route path="/product/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} /> {/* Title set in component */}
          <Route path="/cart" element={<PageWrapper title={siteContent.cart.title}><CartPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper title={siteContent.about.title}><AboutPage /></PageWrapper>} />
          <Route path="/faq" element={<PageWrapper title={siteContent.faq.title}><FaqPage /></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper title={siteContent.privacyPolicy.title}><PrivacyPolicyPage /></PageWrapper>} />
          <Route path="/terms-of-service" element={<PageWrapper title={siteContent.terms.title}><TermsOfServicePage /></PageWrapper>} />
          <Route path="/return-policy" element={<PageWrapper title={siteContent.returnPolicy.title}><ReturnPolicyPage /></PageWrapper>} />
          <Route path="/shipping-policy" element={<PageWrapper title={siteContent.shippingPolicy.title}><ShippingPolicyPage /></PageWrapper>} />
          <Route path="/offline" element={<PageWrapper title="Hors Connexion"><OfflinePage /></PageWrapper>} />
          <Route path="*" element={<PageWrapper title="Page non trouvée"><NotFoundPage /></PageWrapper>} />
        </Routes>
      </MainLayout>
      <CustomNotification onInstallClick={handleInstallClick} />
    </HashRouter>
  );
};

export default App;
