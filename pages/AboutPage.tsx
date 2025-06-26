import React from 'react';
import ContactForm from '../components/UI/ContactForm';
import { siteContent } from '../data/siteContent';
import Button from '../components/UI/Button';
import Card, { CardContent, CardTitle } from '../components/UI/Card';
import { EmailIcon, PhoneIcon, MapPinIcon, ArrowPathIcon, WhatsAppIcon, ExternalLinkIcon } from '../components/UI/Icon';

const AboutPage: React.FC = () => {
  const { about, contact, socialLinks } = siteContent;

  const commonIconClass = "w-6 h-6 text-primary-dark dark:text-primary-light group-hover:text-accent-pink dark:group-hover:text-accent-pink transition-colors";

  return (
    // Further increased bottom padding from pb-32 to pb-40
    <div className="space-y-12 pb-40"> 
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 dark:text-slate-100 mb-6">{about.title}</h1>
        <p className="text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">{about.introduction}</p>
      </section>

      <section className="bg-secondary-light dark:bg-slate-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-primary-dark dark:text-primary-light mb-4 text-center">{about.ourMission}</h2>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
          {/* Add more detailed mission statement here if available */}
          Notre engagement est de vous offrir une sélection rigoureuse de vêtements et accessoires qui combinent style, qualité et confort. Nous aspirons à être votre partenaire de confiance pour une mode qui vous ressemble et sublime votre quotidien.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Information & Map Links Card */}
        <Card className="lg:col-span-1">
          <CardContent>
            <CardTitle>{about.contactUs}</CardTitle>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-slate-300">
              <li className="flex items-start group">
                <MapPinIcon className={`${commonIconClass} mr-3 mt-1 flex-shrink-0`} />
                <div>
                  <span className="font-medium">{contact.address}</span><br/>
                  <span>{contact.city}</span>
                </div>
              </li>
              <li className="flex items-center group">
                <EmailIcon className={`${commonIconClass} mr-3 flex-shrink-0`} />
                <a href={`mailto:${contact.email}?subject=Contact%20depuis%20Lyma%20Shop&body=Bonjour,...`} className="hover:text-primary-dark dark:hover:text-primary-light transition-colors">
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
                  Discuter sur WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6 space-y-3">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => window.open(contact.mapLocationUrl, '_blank')}
                leftIcon={<MapPinIcon className="w-5 h-5"/>}
                rightIcon={<ExternalLinkIcon className="w-4 h-4 opacity-70"/>}
              >
                {about.locationButton}
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => window.open(contact.mapDirectionsUrl, '_blank')}
                leftIcon={<ArrowPathIcon className="w-5 h-5"/>}
                rightIcon={<ExternalLinkIcon className="w-4 h-4 opacity-70"/>}
              >
                {about.directionsButton}
              </Button>
            </div>
            <div className="mt-8">
              <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-slate-100">Suivez-nous :</h4>
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}
                     className="text-gray-500 hover:text-primary-dark dark:text-gray-400 dark:hover:text-primary-light transition-colors">
                    <link.icon className="w-7 h-7" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form & Map Embed Card */}
        <Card className="lg:col-span-2" id="contact-form">
           <CardContent>
            <CardTitle>{about.formTitle}</CardTitle>
            <ContactForm />
          </CardContent>
          <div className="border-t border-gray-200 dark:border-slate-700 p-2 sm:p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4 px-4 pt-2">{about.locationTitle}</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
              <iframe
                src={contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emplacement de Lyma Shop"
              ></iframe>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;