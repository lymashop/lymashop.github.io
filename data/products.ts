import { Product } from '../types';
import { CURRENCY_CODE } from '../constants';

export const products: Product[] = [
  {
    id: '1',
    name: 'Robe Élégante "Harmonie Florale"',
    description: 'Une robe midi exquise avec un imprimé floral délicat, parfaite pour les occasions spéciales.',
    longDescription: 'Confectionnée dans un tissu léger et fluide, cette robe présente une coupe cintrée à la taille et une jupe évasée qui sublime la silhouette. Les manches courtes bouffantes ajoutent une touche romantique. Doublure intégrale pour un confort optimal. Idéale avec des sandales à talons et une pochette assortie.',
    price: 35000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod1img1/600/800',
      'https://picsum.photos/seed/prod1img2/600/800',
      'https://picsum.photos/seed/prod1img3/600/800',
    ],
    category: 'Robes',
    stock: 15,
    rating: 4.5,
    reviews: 25,
    tags: ['floral', 'midi', 'élégant', 'occasion']
  },
  {
    id: '2',
    name: 'Sac à Main "Chic Parisien"',
    description: 'Un sac structuré en cuir vegan de haute qualité, l\'accessoire indispensable pour un look sophistiqué.',
    longDescription: 'Ce sac à main allie élégance intemporelle et praticité. Il dispose de multiples compartiments intérieurs, d\'une fermeture zippée sécurisée et d\'une bandoulière amovible. Ses finitions dorées apportent une touche de luxe. Disponible en plusieurs coloris classiques.',
    price: 22500,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod2img1/600/600',
      'https://picsum.photos/seed/prod2img2/600/600',
    ],
    category: 'Accessoires',
    stock: 30,
    rating: 4.8,
    reviews: 42,
    tags: ['sac à main', 'cuir vegan', 'sophistiqué', 'quotidien']
  },
  {
    id: '3',
    name: 'Blouse "Douceur Satinée"',
    description: 'Blouse en satin fluide à col V, un essentiel polyvalent pour le bureau ou une sortie.',
    longDescription: 'Cette blouse soyeuse offre un tombé impeccable et un confort exceptionnel. Sa coupe légèrement ample et ses manches longues boutonnées aux poignets la rendent facile à porter et à associer. Parfaite rentrée dans un pantalon taille haute ou portée ample sur un jean.',
    price: 18000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod3img1/600/800',
      'https://picsum.photos/seed/prod3img2/600/800',
    ],
    category: 'Hauts',
    stock: 22,
    rating: 4.2,
    reviews: 18,
    tags: ['blouse', 'satin', 'col v', 'polyvalent']
  },
  {
    id: '4',
    name: 'Jupe Plissée "Éclat Métallique"',
    description: 'Jupe midi plissée avec un subtil éclat métallique, pour un style audacieux et tendance.',
    longDescription: 'Affirmez votre style avec cette jupe plissée qui capte la lumière. Sa taille élastiquée assure un ajustement confortable. Portez-la avec un pull en maille fine pour un look de jour chic, ou avec un caraco en soie pour une soirée.',
    price: 20000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod4img1/600/800',
      'https://picsum.photos/seed/prod4img2/600/800',
    ],
    category: 'Jupes',
    stock: 10,
    rating: 4.6,
    reviews: 15,
    tags: ['jupe plissée', 'métallique', 'tendance', 'midi']
  },
  {
    id: '5',
    name: 'Collier "Perle Baroque"',
    description: 'Collier délicat orné d\'une perle baroque naturelle, ajoutant une touche d\'originalité.',
    longDescription: 'Chaque perle baroque est unique, ce qui rend ce collier spécial. Monté sur une fine chaîne en plaqué or, il se porte seul ou en accumulation avec d\'autres colliers. Un bijou intemporel qui rehausse n\'importe quelle tenue.',
    price: 15000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod5img1/600/600',
    ],
    category: 'Bijoux',
    stock: 50,
    rating: 4.9,
    reviews: 30,
    tags: ['collier', 'perle', 'baroque', 'plaqué or', 'bijou']
  },
  {
    id: '6',
    name: 'Pantalon Palazzo "Confort Absolu"',
    description: 'Pantalon large et fluide en tissu respirant, alliant style et confort pour toutes les saisons.',
    longDescription: 'Ce pantalon palazzo est un must-have pour une garde-robe moderne. Sa taille haute élastiquée et sa coupe ample offrent une liberté de mouvement incomparable. Parfait avec des baskets pour un look décontracté ou des talons pour une allure plus sophistiquée.',
    price: 25000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod6img1/600/900',
      'https://picsum.photos/seed/prod6img2/600/900',
    ],
    category: 'Pantalons',
    stock: 18,
    rating: 4.4,
    reviews: 22,
    tags: ['pantalon palazzo', 'fluide', 'confortable', 'taille haute']
  },
  {
    id: '7',
    name: 'Veste Blazer "Audace Structurée"',
    description: 'Une veste blazer cintrée pour une allure professionnelle et chic.',
    longDescription: 'Cette veste blazer est confectionnée dans un tissu de qualité avec une coupe impeccable. Elle possède des épaulettes discrètes, un bouton unique et des poches passepoilées. Parfaite sur une blouse ou un t-shirt simple.',
    price: 42000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod7img1/600/800',
    ],
    category: 'Hauts', // Could also be 'Vestes' if we add that category
    stock: 12,
    rating: 4.7,
    reviews: 19,
    tags: ['veste', 'blazer', 'professionnel', 'chic', 'structuré']
  },
  {
    id: '8',
    name: 'Foulard en Soie "Impression Exotique"',
    description: 'Un grand foulard en soie pure avec un imprimé coloré et original.',
    longDescription: 'Accessoirisez vos tenues avec ce magnifique foulard en soie. Ses dimensions généreuses permettent de le porter de multiples façons : autour du cou, sur les épaules, ou même en ceinture. L\'imprimé est exclusif à Lyma Shop.',
    price: 12000,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod8img1/600/600',
    ],
    category: 'Accessoires',
    stock: 40,
    rating: 4.3,
    reviews: 10,
    tags: ['foulard', 'soie', 'imprimé', 'coloré', 'accessoire']
  },
  {
    id: '9',
    name: 'Ceinture en Cuir "Classique Intemporel"',
    description: 'Ceinture fine en cuir véritable avec une boucle dorée discrète.',
    longDescription: 'Une ceinture essentielle qui s\'adapte à toutes vos tenues. Fabriquée en cuir de qualité, elle est conçue pour durer. La boucle minimaliste apporte une touche d\'élégance sobre.',
    price: 9500,
    currency: CURRENCY_CODE,
    images: [
      'https://picsum.photos/seed/prod9img1/600/400',
    ],
    category: 'Accessoires',
    stock: 25,
    rating: 4.0,
    reviews: 8,
    tags: ['ceinture', 'cuir', 'classique', 'doré']
  }
];