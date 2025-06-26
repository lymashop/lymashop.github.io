export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  stock?: number; // Optional: for future stock management
  rating?: number; // Optional: average product rating
  reviews?: number; // Optional: number of reviews
  tags?: string[]; // Optional: for filtering/search
}

export interface CartItem extends Product {
  quantity: number;
}

export type Theme = 'light' | 'dark';

export interface SiteTextContent {
  appName: string;
  metaDescription: string;
  navLinks: { name: string; path: string }[];
  contact: {
    address: string;
    city: string;
    fullAddress: string;
    email: string;
    phone: string;
    whatsapp: string;
    mapEmbedUrl: string;
    mapLocationUrl: string;
    mapDirectionsUrl: string;
  };
  socialLinks: { name: string; url: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[];
  home: {
    title: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    heroImageUrl: string;
    featuredProductsTitle: string;
  };
  catalog: {
    title: string;
    searchPlaceholder: string;
    noProductsFound: string;
    filtersTitle: string;
    categoriesTitle: string;
    sortTitle: string;
    applyFiltersButton: string;
    clearFiltersButton: string;
    allCategoriesLabel: string;
  };
  product: {
    addToCart: string;
    details: string;
    relatedProducts: string;
    productNotFound: string;
    shareProduct: string;
  };
  cart: {
    title: string;
    emptyCartMessage: string;
    summaryTitle: string;
    subtotal: string;
    total: string;
    orderButton: string;
    removeItemLabel: string;
    quantityLabel: string;
    priceLabel: string;
  };
  about: {
    title: string;
    introduction: string;
    ourMission: string;
    contactUs: string;
    formTitle: string;
    formNamePlaceholder: string;
    formEmailPlaceholder: string;
    formMessagePlaceholder: string;
    formSubmitButton: string;
    formSuccessMessage: string;
    formErrorMessage: string;
    locationTitle: string;
    locationButton: string;
    directionsButton: string;
  };
  faq: {
    title: string;
    questions: { id: string; question: string; answer: string }[];
  };
  privacyPolicy: {
    title: string;
    content: string; // HTML content or structured
  };
  terms: {
    title: string;
    content: string;
  };
  returnPolicy: {
    title: string;
    content: string;
  };
  shippingPolicy: {
    title: string;
    content: string;
  };
  footer: {
    quickLinks: string;
    contactInfo: string;
    followUs: string;
    copyright: string;
  };
  notFound: {
    title: string;
    message: string;
    goHome: string;
  };
  offline: {
    title: string;
    message: string;
    checkConnection: string;
  };
  notification: {
    pwaInstallTitle: string;
    pwaInstallMessage: string;
    pwaInstallButton: string;
    pwaInstallDismiss: string;
  }
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PolicyPageContent {
  title: string;
  // Content can be a single string (potentially with markdown/HTML) or structured
  // For simplicity, using string here. Could be an array of paragraphs/sections.
  content: string; 
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationAction {
  label: string;
  onClick: () => void;
}
export interface AppNotification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number; // in ms
  customAction?: NotificationAction;
}

export interface SortOption {
  value: string;
  label: string;
}