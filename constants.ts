
export const APP_NAME = "Lyma Shop";
export const DEFAULT_THEME = 'light';
export const THEME_STORAGE_KEY = 'lymaShopTheme';
export const CART_STORAGE_KEY = 'lymaShopCart';
export const PWA_NOTIFICATION_SHOWN_KEY = 'lymaShopPwaNotificationShown';

export const CONTACT_EMAIL = "lymashop5s9@gmail.com";
export const CONTACT_PHONE = "+221776196418"; // Make sure it's correct format for tel: links
export const CONTACT_WHATSAPP_NUMBER = "221776196418"; // Number for WhatsApp API link
export const CONTACT_ADDRESS_FULL = "Dakar, Keur Massar, Jaxaay-Parcelle-Niakoul Rap";
export const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15433.03329652577!2d-17.282523!3d14.754470999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1a00f6eab30ef%3A0xd55f997cde69003!2sLyma%20Shop!5e0!3m2!1sfr!2ssn!4v1750630595137!5m2!1sfr!2ssn";
export const MAP_LOCATION_URL = "https://maps.google.com/maps?ll=14.754471,-17.282523&z=14&t=m&hl=fr&gl=SN&mapclient=embed&cid=960948525903286275";
export const MAP_DIRECTIONS_URL = "https://maps.google.com/maps/dir//Lyma+Shop/@14.7544709,-17.282523,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0xec1a00f6eab30ef:0xd55f997cde69003";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkzwakq";

export const CURRENCY_CODE = "FCFA"; // XOF is the ISO code, but FCFA is commonly displayed

export const HERO_IMAGE_URL = "https://res.cloudinary.com/dbwgcxeed/image/upload/v1750617073/2bs3mHeroImage_zp0kkh.png";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/your_instagram", // Replace with actual link
  facebook: "https://www.facebook.com/your_facebook",   // Replace with actual link
  telegram: "https://t.me/your_telegram",         // Replace with actual link
  pinterest: "https://www.pinterest.com/your_pinterest", // Replace with actual link
  whatsapp: `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=Bonjour%20Lyma%20Shop%2C%20j'aimerais%20avoir%20plus%20d'informations.`,
};

// Animation variants for Framer Motion (optional, but good for UI polish)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
