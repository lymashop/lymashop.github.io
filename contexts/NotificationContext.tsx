
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AppNotification } from '../types';

interface NotificationContextProps {
  notifications: AppNotification[];
  showNotification: (notification: Omit<AppNotification, 'id'> & { id?: string }) => string;
  removeNotification: (id: string) => void;
  pwaInstallPromptVisible: boolean;
  showPWAInstallPrompt: () => void;
  hidePWAInstallPrompt: () => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  showNotification: () => '',
  removeNotification: () => {},
  pwaInstallPromptVisible: false,
  showPWAInstallPrompt: () => {},
  hidePWAInstallPrompt: () => {},
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [pwaInstallPromptVisible, setPWAInstallPromptVisible] = useState(false);

  const showNotification = useCallback((notification: Omit<AppNotification, 'id'> & { id?: string }) => {
    const id = notification.id || Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);
    if (newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showPWAInstallPrompt = useCallback(() => {
    setPWAInstallPromptVisible(true);
  }, []);
  
  const hidePWAInstallPrompt = useCallback(() => {
    setPWAInstallPromptVisible(false);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      showNotification, 
      removeNotification,
      pwaInstallPromptVisible,
      showPWAInstallPrompt,
      hidePWAInstallPrompt
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
