
import React from 'react';
import Accordion, { AccordionItem } from '../components/UI/Accordion';
import { siteContent } from '../data/siteContent';

const FaqPage: React.FC = () => {
  const { faq } = siteContent;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif text-gray-800 dark:text-slate-100 mb-4">{faq.title}</h1>
        <p className="text-lg text-gray-600 dark:text-slate-300">
          Trouvez des réponses à vos questions les plus courantes sur Lyma Shop.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden">
        <Accordion>
          {faq.questions.map((item, index) => (
            <AccordionItem key={item.id} title={item.question} isOpenDefault={index === 0}>
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-700 dark:text-slate-300">
          Vous ne trouvez pas la réponse à votre question ?
        </p>
        <a 
          href={`mailto:${siteContent.contact.email}?subject=Question%20FAQ%20-%20Lyma%20Shop`}
          className="mt-2 inline-block text-primary-dark dark:text-primary-light hover:underline font-medium"
        >
          Contactez-nous directement
        </a>
      </div>
    </div>
  );
};

export default FaqPage;
