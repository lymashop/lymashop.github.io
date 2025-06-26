
export interface NavLink {
  name: string;
  path: string;
}

export const navLinks: NavLink[] = [
  { name: 'Accueil', path: '/' },
  { name: 'Catalogue', path: '/catalog' },
  { name: 'À Propos', path: '/about' },
  { name: 'FAQ', path: '/faq' },
];

export const footerLinks = {
  company: [
    { name: 'À Propos de Nous', path: '/about' },
    { name: 'Catalogue des Produits', path: '/catalog' },
  ],
  help: [
    { name: 'FAQ', path: '/faq' },
    { name: 'Contactez-nous', path: '/about#contact-form' }, // Link to contact section in about page
    { name: 'Politique de Livraison', path: '/shipping-policy' },
    { name: 'Politique de Retour', path: '/return-policy' },
  ],
  legal: [
    { name: 'Conditions Générales de Vente', path: '/terms-of-service' },
    { name: 'Politique de Confidentialité', path: '/privacy-policy' },
  ],
};
