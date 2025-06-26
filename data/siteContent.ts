import { SiteTextContent } from '../types';
import { 
  CONTACT_ADDRESS_FULL, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP_NUMBER, 
  MAP_EMBED_URL, MAP_LOCATION_URL, MAP_DIRECTIONS_URL, HERO_IMAGE_URL, SOCIAL_LINKS 
} from '../constants';
import { FacebookIcon, InstagramIcon, PinterestIcon, TelegramIcon, WhatsAppIcon, EmailIcon, PhoneIcon, MapPinIcon, ArrowPathIcon } from '../components/UI/Icon';


export const siteContent: SiteTextContent = {
  appName: "Lyma Shop",
  metaDescription: "Lyma Shop est une boutique en ligne élégante pour la mode féminine, vêtements et accessoires. Découvrez les dernières tendances et sublimez votre style.",
  navLinks: [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'À Propos', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ],
  contact: {
    address: "Keur Massar, Jaxaay-Parcelle-Niakoul Rap",
    city: "Dakar, Sénégal",
    fullAddress: CONTACT_ADDRESS_FULL,
    email: CONTACT_EMAIL,
    phone: CONTACT_PHONE,
    whatsapp: CONTACT_WHATSAPP_NUMBER,
    mapEmbedUrl: MAP_EMBED_URL,
    mapLocationUrl: MAP_LOCATION_URL,
    mapDirectionsUrl: MAP_DIRECTIONS_URL,
  },
  socialLinks: [
    { name: 'Instagram', url: SOCIAL_LINKS.instagram, icon: InstagramIcon },
    { name: 'Facebook', url: SOCIAL_LINKS.facebook, icon: FacebookIcon },
    { name: 'Telegram', url: SOCIAL_LINKS.telegram, icon: TelegramIcon },
    { name: 'Pinterest', url: SOCIAL_LINKS.pinterest, icon: PinterestIcon },
    { name: 'WhatsApp', url: SOCIAL_LINKS.whatsapp, icon: WhatsAppIcon },
  ],
  home: {
    title: "Accueil",
    metaDescription: "Bienvenue chez Lyma Shop. Découvrez nos collections exclusives de mode féminine, vêtements et accessoires.",
    heroTitle: "Élégance & Style à votre Portée",
    heroSubtitle: "Explorez nos nouvelles collections et trouvez les pièces parfaites pour exprimer votre individualité. Qualité, tendance et service exceptionnel.",
    heroCta: "Découvrir la Collection",
    heroImageUrl: HERO_IMAGE_URL,
    featuredProductsTitle: "Nos Coups de Cœur"
  },
  catalog: {
    title: "Catalogue des Produits",
    searchPlaceholder: "Rechercher un produit...",
    noProductsFound: "Aucun produit ne correspond à vos critères. Essayez d'autres mots-clés ou filtres.",
    filtersTitle: "Filtres",
    categoriesTitle: "Catégories",
    sortTitle: "Trier par",
    applyFiltersButton: "Appliquer",
    clearFiltersButton: "Réinitialiser",
    allCategoriesLabel: "Toutes les catégories",
  },
  product: {
    addToCart: "Ajouter au Panier",
    details: "Détails du Produit",
    relatedProducts: "Vous pourriez aussi aimer",
    productNotFound: "Produit non trouvé",
    shareProduct: "Partager ce produit",
  },
  cart: {
    title: "Votre Panier d'Achats",
    emptyCartMessage: "Votre panier est actuellement vide. Explorez nos collections !",
    summaryTitle: "Résumé de la Commande",
    subtotal: "Sous-total",
    total: "Total",
    orderButton: "Commander via WhatsApp",
    removeItemLabel: "Retirer l'article",
    quantityLabel: "Quantité",
    priceLabel: "Prix",
  },
  about: {
    title: "À Propos de Lyma Shop",
    introduction: "Lyma Shop est bien plus qu'une simple boutique en ligne. C'est une destination pour les femmes modernes qui recherchent l'élégance, la qualité et des pièces uniques pour affirmer leur style. Fondée avec passion, notre mission est de vous offrir une expérience de shopping exceptionnelle, des dernières tendances aux classiques intemporels.",
    ourMission: "Notre mission est de sélectionner avec soin des vêtements et accessoires qui allient mode, confort et durabilité. Nous croyons que chaque femme mérite de se sentir belle et confiante, et nous nous engageons à vous fournir des articles qui vous inspirent.",
    contactUs: "Contactez-Nous",
    formTitle: "Envoyez-nous un Message",
    formNamePlaceholder: "Votre Nom Complet",
    formEmailPlaceholder: "Votre Adresse E-mail",
    formMessagePlaceholder: "Votre Message...",
    formSubmitButton: "Envoyer le Message",
    formSuccessMessage: "Merci ! Votre message a été envoyé avec succès.",
    formErrorMessage: "Oups ! Une erreur s'est produite. Veuillez réessayer.",
    locationTitle: "Retrouvez-nous",
    locationButton: "Voir sur la Carte",
    directionsButton: "Obtenir l'Itinéraire",
  },
  faq: {
    title: "Questions Fréquemment Posées (FAQ)",
    questions: [
      { id: 'q1', question: "Quels sont les délais de livraison ?", answer: "Les délais de livraison varient en fonction de votre localisation. En général, pour Dakar et sa banlieue, comptez 24-48h. Pour les autres régions, cela peut prendre jusqu'à 72h. Vous recevrez une estimation plus précise lors de la confirmation de votre commande." },
      { id: 'q2', question: "Quelle est votre politique de retour ?", answer: "Nous acceptons les retours sous 7 jours pour les articles non portés, non lavés, avec leurs étiquettes d'origine. Veuillez consulter notre page 'Politique de Retour' pour plus de détails." },
      { id: 'q3', question: "Comment puis-je suivre ma commande ?", answer: "Une fois votre commande expédiée, vous recevrez un numéro de suivi par e-mail ou SMS (si option choisie). Vous pourrez utiliser ce numéro pour suivre l'acheminement de votre colis." },
      { id: 'q4', question: "Proposez-vous des cartes cadeaux ?", answer: "Oui, nous proposons des cartes cadeaux électroniques de différents montants. C'est le cadeau parfait pour faire plaisir à coup sûr !" },
      { id: 'q5', question: "Les paiements sont-ils sécurisés ?", answer: "Pour l'instant, les commandes se finalisent via WhatsApp où nous discutons des modalités de paiement (Orange Money, Wave, etc.). Nous explorons des options de paiement en ligne sécurisées pour l'avenir." },
    ],
  },
  privacyPolicy: {
    title: "Politique de Confidentialité",
    content: `
      <h2 class="text-xl font-semibold mb-3">Introduction</h2>
      <p class="mb-4">Lyma Shop s'engage à protéger la vie privée de ses clients. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.</p>
      
      <h2 class="text-xl font-semibold mb-3">Collecte d'Informations</h2>
      <p class="mb-2">Nous collectons des informations lorsque vous :</p>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li>Naviguez sur notre site (données analytiques anonymes).</li>
        <li>Nous contactez via le formulaire ou directement par e-mail/téléphone.</li>
        <li>Passez une commande (via WhatsApp pour le moment).</li>
      </ul>
      <p class="mb-4">Les informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone, adresse de livraison et détails de commande.</p>

      <h2 class="text-xl font-semibold mb-3">Utilisation des Informations</h2>
      <p class="mb-2">Vos informations sont utilisées pour :</p>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li>Traiter et livrer vos commandes.</li>
        <li>Communiquer avec vous concernant vos commandes ou demandes.</li>
        <li>Améliorer notre site et nos services.</li>
        <li>Vous informer des nouveautés et promotions (avec votre consentement).</li>
      </ul>

      <h2 class="text-xl font-semibold mb-3">Partage d'Informations</h2>
      <p class="mb-4">Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins marketing sans votre consentement explicite, sauf si requis par la loi ou pour exécuter nos services (ex: sociétés de livraison).</p>
      
      <h2 class="text-xl font-semibold mb-3">Sécurité</h2>
      <p class="mb-4">Nous prenons des mesures raisonnables pour protéger vos informations. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100%.</p>

      <h2 class="text-xl font-semibold mb-3">Vos Droits</h2>
      <p class="mb-4">Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Contactez-nous pour exercer ces droits.</p>

      <h2 class="text-xl font-semibold mb-3">Cookies</h2>
      <p class="mb-4">Notre site utilise des cookies essentiels pour son fonctionnement (panier, préférences de thème) et des cookies analytiques (anonymes) pour améliorer l'expérience utilisateur. Vous pouvez gérer les cookies via les paramètres de votre navigateur.</p>

      <h2 class="text-xl font-semibold mb-3">Modifications de cette Politique</h2>
      <p class="mb-4">Nous pouvons mettre à jour cette politique. La date de la dernière mise à jour sera indiquée en haut de la page.</p>

      <h2 class="text-xl font-semibold mb-3">Contact</h2>
      <p>Pour toute question concernant cette politique, veuillez nous contacter à ${CONTACT_EMAIL}.</p>
    `,
  },
  terms: {
    title: "Conditions Générales de Vente",
    content: `
      <h2 class="text-xl font-semibold mb-3">1. Objet</h2>
      <p class="mb-4">Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Lyma Shop et toute personne effectuant un achat sur le site. Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>

      <h2 class="text-xl font-semibold mb-3">2. Produits</h2>
      <p class="mb-4">Les produits proposés à la vente sont ceux décrits sur le site au jour de la consultation par l'utilisateur. Lyma Shop apporte le plus grand soin à la présentation et à la description des produits mais ne peut garantir l'exactitude parfaite (notamment des couleurs qui peuvent varier selon les écrans).</p>

      <h2 class="text-xl font-semibold mb-3">3. Prix</h2>
      <p class="mb-4">Les prix sont indiqués en Francs CFA (XOF) et s'entendent toutes taxes comprises (TTC), hors frais de livraison. Lyma Shop se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.</p>

      <h2 class="text-xl font-semibold mb-3">4. Commande</h2>
      <p class="mb-4">Le processus de commande se finalise actuellement via WhatsApp. L'utilisateur sélectionne les produits sur le site et initie la commande via le lien WhatsApp fourni. La commande est considérée comme définitive après confirmation des détails (produits, quantités, prix, adresse de livraison, modalités de paiement) et accord mutuel sur WhatsApp.</p>

      <h2 class="text-xl font-semibold mb-3">5. Paiement</h2>
      <p class="mb-4">Les modalités de paiement (Orange Money, Wave, virement bancaire, etc.) sont convenues lors de la finalisation de la commande sur WhatsApp. Le paiement doit être effectué avant l'expédition de la commande, sauf accord contraire.</p>

      <h2 class="text-xl font-semibold mb-3">6. Livraison</h2>
      <p class="mb-4">La livraison est effectuée à l'adresse indiquée par le client lors de la commande. Les délais et frais de livraison sont communiqués au client avant la validation finale de la commande. Lyma Shop ne saurait être tenue responsable des retards de livraison dus au transporteur ou à des cas de force majeure.</p>
      
      <h2 class="text-xl font-semibold mb-3">7. Droit de Rétractation et Retours</h2>
      <p class="mb-4">Conformément à notre politique de retour, le client dispose d'un délai de 7 jours à compter de la réception des produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités, à l'exception des frais de retour. Les produits doivent être retournés dans leur état d'origine, non portés, non lavés, avec toutes leurs étiquettes. Voir notre 'Politique de Retour' pour les détails.</p>

      <h2 class="text-xl font-semibold mb-3">8. Responsabilité</h2>
      <p class="mb-4">Lyma Shop ne saurait être tenue pour responsable de l'inexécution du contrat conclu en cas de rupture de stock ou indisponibilité du produit, de force majeure, de perturbation ou grève totale ou partielle notamment des services postaux et moyens de transport et/ou communications.</p>

      <h2 class="text-xl font-semibold mb-3">9. Propriété Intellectuelle</h2>
      <p class="mb-4">Tous les éléments du site Lyma Shop (textes, images, logos, etc.) sont et restent la propriété intellectuelle et exclusive de Lyma Shop. Personne n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site.</p>

      <h2 class="text-xl font-semibold mb-3">10. Droit Applicable et Litiges</h2>
      <p class="mb-4">Les présentes CGV sont soumises à la loi sénégalaise. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux compétents de Dakar seront seuls compétents.</p>
    `,
  },
  returnPolicy: {
    title: "Politique de Retour et Remboursement",
    content: `
      <p class="mb-4">Chez Lyma Shop, votre satisfaction est notre priorité. Si un article ne vous convient pas, vous pouvez nous le retourner sous certaines conditions.</p>

      <h2 class="text-xl font-semibold mb-3">Conditions de Retour</h2>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li>Vous disposez d'un délai de <strong>7 jours</strong> à compter de la date de réception de votre commande pour nous informer de votre intention de retourner un article.</li>
        <li>L'article doit être retourné dans son état d'origine : non porté, non lavé, non endommagé, avec toutes ses étiquettes attachées et dans son emballage d'origine si possible.</li>
        <li>Les articles soldés ou en promotion spéciale peuvent avoir des conditions de retour spécifiques, veuillez vérifier au moment de l'achat.</li>
        <li>Pour des raisons d'hygiène, certains articles (comme la lingerie, les maillots de bain si la protection hygiénique a été retirée, les boucles d'oreilles) ne peuvent pas être retournés, sauf en cas de défaut de fabrication.</li>
      </ul>

      <h2 class="text-xl font-semibold mb-3">Processus de Retour</h2>
      <ol class="list-decimal list-inside mb-4 ml-4">
        <li>Contactez notre service client par e-mail à ${CONTACT_EMAIL} ou via WhatsApp au ${CONTACT_PHONE} en indiquant votre numéro de commande et le(s) article(s) que vous souhaitez retourner ainsi que la raison.</li>
        <li>Nous vous indiquerons la procédure à suivre pour le retour du colis. Les frais de retour sont généralement à la charge du client, sauf si l'article est défectueux ou si nous avons commis une erreur dans la commande.</li>
        <li>Emballez soigneusement l'article pour éviter tout dommage pendant le transport.</li>
      </ol>

      <h2 class="text-xl font-semibold mb-3">Remboursement ou Échange</h2>
      <p class="mb-4">Une fois l'article retourné reçu et inspecté, nous vous informerons de l'approbation ou du rejet de votre demande.</p>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li><strong>Remboursement :</strong> Si approuvé, votre remboursement sera traité via le mode de paiement initial (Orange Money, Wave, etc.) dans un délai de 5 à 7 jours ouvrables.</li>
        <li><strong>Échange :</strong> Si vous souhaitez un échange contre une autre taille ou un autre article, veuillez le préciser lors de votre demande de retour. L'échange dépendra de la disponibilité des stocks. Des frais de livraison pour le nouvel envoi peuvent s'appliquer.</li>
        <li><strong>Avoir :</strong> Dans certains cas, nous pouvons vous proposer un avoir du montant de l'article retourné, valable sur votre prochaine commande.</li>
      </ul>

      <h2 class="text-xl font-semibold mb-3">Articles Défectueux ou Incorrects</h2>
      <p class="mb-4">Si vous recevez un article défectueux ou incorrect, veuillez nous contacter immédiatement (dans les 48h suivant la réception) avec des photos à l'appui. Nous prendrons en charge les frais de retour et vous proposerons un remplacement, un remboursement intégral ou un avoir.</p>

      <p class="mb-4">Pour toute question, n'hésitez pas à nous contacter. Nous sommes là pour vous aider !</p>
    `,
  },
  shippingPolicy: {
    title: "Politique de Livraison",
    content: `
      <p class="mb-4">Nous nous efforçons de vous livrer vos articles Lyma Shop le plus rapidement et efficacement possible.</p>

      <h2 class="text-xl font-semibold mb-3">Zones de Livraison</h2>
      <p class="mb-4">Nous livrons actuellement principalement à <strong>Dakar et sa banlieue</strong>. Nous pouvons également organiser des livraisons dans d'autres régions du Sénégal. Veuillez nous contacter pour confirmer la faisabilité et les coûts pour les livraisons hors de Dakar.</p>

      <h2 class="text-xl font-semibold mb-3">Délais de Livraison</h2>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li><strong>Dakar et banlieue proche :</strong> Généralement 24 à 48 heures ouvrables après confirmation de la commande et du paiement.</li>
        <li><strong>Autres régions du Sénégal :</strong> 48 à 72 heures ouvrables, voire plus selon la destination. Nous vous donnerons une estimation plus précise lors de la commande.</li>
      </ul>
      <p class="mb-4">Ces délais sont estimatifs et peuvent varier en fonction des volumes de commande, des conditions de circulation ou d'autres imprévus. Nous vous tiendrons informés en cas de retard significatif.</p>

      <h2 class="text-xl font-semibold mb-3">Frais de Livraison</h2>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li>Les frais de livraison sont calculés en fonction de la destination et du poids/volume de la commande.</li>
        <li>Ils vous seront communiqués et confirmés avant la finalisation de votre commande sur WhatsApp.</li>
        <li>Nous pouvons occasionnellement proposer des offres de livraison gratuite sous conditions (montant minimum d'achat, promotions spéciales).</li>
      </ul>

      <h2 class="text-xl font-semibold mb-3">Processus de Livraison</h2>
      <ol class="list-decimal list-inside mb-4 ml-4">
        <li>Une fois votre commande confirmée et le paiement reçu, nous préparons votre colis.</li>
        <li>Nous faisons appel à des services de livraison locaux fiables ou organisons la livraison en interne.</li>
        <li>Vous serez contacté par le livreur pour coordonner la réception du colis. Il est important de fournir un numéro de téléphone joignable.</li>
        <li>Une signature ou une confirmation de réception peut être demandée.</li>
      </ol>
      
      <h2 class="text-xl font-semibold mb-3">Suivi de Commande</h2>
      <p class="mb-4">Pour les livraisons via des partenaires, un numéro de suivi peut être fourni. Pour les livraisons directes, nous vous tiendrons informés de l'avancement.</p>

      <h2 class="text-xl font-semibold mb-3">Adresse de Livraison Incorrecte</h2>
      <p class="mb-4">Veuillez vérifier attentivement votre adresse de livraison lors de la commande. Lyma Shop ne saurait être tenue responsable en cas de non-livraison due à une adresse incorrecte ou incomplète. Des frais supplémentaires pourraient s'appliquer pour une nouvelle tentative de livraison.</p>

      <h2 class="text-xl font-semibold mb-3">Réception du Colis</h2>
      <p class="mb-4">À la réception, veuillez vérifier l'état de votre colis en présence du livreur. Si vous constatez une anomalie (colis endommagé, ouvert), veuillez le signaler immédiatement au livreur et nous en informer au plus vite.</p>

      <p class="mb-4">Pour toute question spécifique concernant la livraison, n'hésitez pas à nous contacter.</p>
    `,
  },
  footer: {
    quickLinks: "Liens Rapides",
    contactInfo: "Nous Contacter",
    followUs: "Suivez-Nous",
    copyright: `© ${new Date().getFullYear()} Lyma Shop. Tous droits réservés.`,
  },
  notFound: {
    title: "404 - Page Non Trouvée",
    message: "Oups ! La page que vous recherchez semble s'être égarée dans le cyberespace. Elle n'existe pas ou a été déplacée.",
    goHome: "Retour à l'Accueil",
  },
  offline: {
    title: "Mode Hors Connexion",
    message: "Il semble que vous soyez actuellement hors connexion.",
    checkConnection: "Veuillez vérifier votre connexion internet pour accéder à toutes les fonctionnalités de Lyma Shop."
  },
  notification: {
    pwaInstallTitle: "Installer Lyma Shop !",
    pwaInstallMessage: "Accédez rapidement à Lyma Shop en l'ajoutant à votre écran d'accueil.",
    pwaInstallButton: "Installer",
    pwaInstallDismiss: "Plus tard"
  }
};