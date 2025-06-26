
import React, { useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import { AppNotification } from '../../types';
import Button from './Button';
import { XMarkIcon, InfoIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowDownTrayIcon } from './Icon';
import { siteContent } from '../../data/siteContent';

interface CustomNotificationProps {
  onInstallClick?: () => void; // For PWA specific install action
}

const NotificationItem: React.FC<{ notification: AppNotification; onDismiss: () => void; onInstallClick?: () => void }> = ({ notification, onDismiss, onInstallClick }) => {
  const IconComponent = {
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationTriangleIcon, 
  }[notification.type];

  const iconColor = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  }[notification.type];
  
  const bgColor = {
    info: 'bg-blue-50 dark:bg-blue-900 border-blue-500',
    success: 'bg-green-50 dark:bg-green-900 border-green-500',
    warning: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-500',
    error: 'bg-red-50 dark:bg-red-900 border-red-500',
  }[notification.type];

  // Specific PWA install prompt
  if (notification.id === 'pwa-install-prompt') {
     return (
      <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 w-full max-w-md p-4 rounded-lg shadow-2xl bg-primary-light dark:bg-primary-dark text-white border-l-4 border-white transform transition-all duration-500 ease-out animate-fadeInUp`}>
        <div className="flex items-start">
          <ArrowDownTrayIcon className="h-8 w-8 mr-3 flex-shrink-0" />
          <div className="flex-grow">
            <h4 className="font-bold text-lg">{siteContent.notification.pwaInstallTitle}</h4>
            <p className="text-sm mt-1">{siteContent.notification.pwaInstallMessage}</p>
            <div className="mt-4 flex space-x-3">
              <Button onClick={onInstallClick} size="sm" className="bg-white text-primary-dark hover:bg-opacity-90">
                {siteContent.notification.pwaInstallButton}
              </Button>
              <Button onClick={onDismiss} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                {siteContent.notification.pwaInstallDismiss}
              </Button>
            </div>
          </div>
          <button onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-white/20 inline-flex h-8 w-8" aria-label="Fermer">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // Generic notifications
  return (
    <div className={`p-4 rounded-md shadow-lg border-l-4 ${bgColor} flex items-start space-x-3 transition-all duration-300 ease-in-out animate-fadeInUp`}>
      <IconComponent className={`h-6 w-6 ${iconColor} flex-shrink-0 mt-0.5`} />
      <div className="flex-grow text-sm text-gray-700 dark:text-gray-200">
        {notification.message}
        {notification.customAction && (
           <Button onClick={() => { notification.customAction?.onClick(); onDismiss(); }} variant="ghost" size="sm" className={`mt-2 ${iconColor} hover:underline`}>
            {notification.customAction.label}
          </Button>
        )}
      </div>
      <button onClick={onDismiss} className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-opacity-20 inline-flex h-8 w-8 ${bgColor.replace('bg-', 'hover:bg-').replace('dark:bg-', 'dark:hover:bg-')}`} aria-label="Fermer">
        <XMarkIcon className="h-5 w-5 text-current" />
      </button>
    </div>
  );
};


const CustomNotification: React.FC<CustomNotificationProps> = ({ onInstallClick }) => {
  const { notifications, removeNotification, pwaInstallPromptVisible, hidePWAInstallPrompt } = useContext(NotificationContext);

  const pwaNotification: AppNotification | null = pwaInstallPromptVisible ? {
    id: 'pwa-install-prompt', // Special ID for specific styling/handling
    message: siteContent.notification.pwaInstallMessage,
    type: 'info' // Type doesn't really matter for this specific one, styling is custom
  } : null;

  const allDisplayNotifications = pwaNotification ? [pwaNotification, ...notifications] : notifications;

  if (allDisplayNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-md space-y-3">
      {allDisplayNotifications.map(notif => (
        <NotificationItem 
          key={notif.id} 
          notification={notif} 
          onDismiss={() => {
            if(notif.id === 'pwa-install-prompt') hidePWAInstallPrompt();
            else removeNotification(notif.id);
          }}
          onInstallClick={notif.id === 'pwa-install-prompt' ? onInstallClick : undefined}
        />
      ))}
       <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomNotification;
