
import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';
import { footerLinks } from '../../data/navLinks';
import ThemeToggle from '../UI/ThemeToggle';
import { EmailIcon, PhoneIcon, MapPinIcon, WhatsAppIcon } from '../UI/Icon';

const Footer: React.FC = () => {
  const { contact, socialLinks, appName } = siteContent;
  const currentYear = new Date().getFullYear();

  const commonIconClass = "w-6 h-6 text-primary-dark dark:text-primary-light group-hover:text-accent-pink dark:group-hover:text-accent-pink transition-colors";

  return (
    <footer className="bg-secondary-light dark:bg-slate-800 text-gray-700 dark:text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Lyma Shop */}
          <div>
            <h5 className="text-2xl font-bold font-serif text-primary-dark dark:text-primary-light mb-4">{appName}</h5>
            <p className="text-sm leading-relaxed">
              {siteContent.metaDescription.substring(0, 150)}...
            </p>
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-slate-100">{siteContent.footer.quickLinks}</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.help.slice(0,2).map((link) => ( // Show first 2 help links
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-slate-100">Aide & Légal</h5>
            <ul className="space-y-2">
              {footerLinks.help.slice(2).map((link) => ( // Show rest of help links
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-slate-100">{siteContent.footer.contactInfo}</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start group">
                <MapPinIcon className={`${commonIconClass} mr-3 mt-1 flex-shrink-0`} />
                <a href={contact.mapLocationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                  {contact.fullAddress}
                </a>
              </li>
              <li className="flex items-center group">
                <EmailIcon className={`${commonIconClass} mr-3 flex-shrink-0`} />
                <a href={`mailto:${contact.email}?subject=Demande%20d'information%20Lyma%20Shop&body=Bonjour%20Lyma%20Shop,%0D%0A%0D%0AJe%20souhaiterais%20avoir%20plus%20d'informations%20concernant...`} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center group">
                <PhoneIcon className={`${commonIconClass} mr-3 flex-shrink-0`} />
                <a href={`tel:${contact.phone}`} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center group">
                <WhatsAppIcon className={`${commonIconClass} mr-3 flex-shrink-0`} />
                <a href={`https://wa.me/${contact.whatsapp}?text=Bonjour%20Lyma%20Shop,%20j'ai%20une%20question.`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                  Message WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-300 dark:border-slate-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex space-x-5 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-gray-500 dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-center md:text-right">{siteContent.footer.copyright.replace(`${currentYear-1}`, `${currentYear}`)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
