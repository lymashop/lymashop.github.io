
import React, { useState } from 'react';
import { FORMSPREE_ENDPOINT } from '../../constants';
import Button from './Button';
import { siteContent } from '../../data/siteContent';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('PENDING');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const data = await response.json();
        if (Object.hasOwnProperty.call(data, 'errors')) {
          setStatus('ERROR: ' + data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setStatus('ERROR');
        }
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          {siteContent.about.formNamePlaceholder}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark dark:bg-slate-700 dark:text-slate-100 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          {siteContent.about.formEmailPlaceholder}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark dark:bg-slate-700 dark:text-slate-100 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          {siteContent.about.formMessagePlaceholder}
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark dark:bg-slate-700 dark:text-slate-100 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <Button type="submit" variant="primary" isLoading={status === 'PENDING'} fullWidth>
          {siteContent.about.formSubmitButton}
        </Button>
      </div>
      {status === 'SUCCESS' && <p className="text-green-600 dark:text-green-400">{siteContent.about.formSuccessMessage}</p>}
      {status.startsWith('ERROR') && <p className="text-red-600 dark:text-red-400">{status === 'ERROR' ? siteContent.about.formErrorMessage : status.substring(7) }</p>}
    </form>
  );
};

export default ContactForm;
