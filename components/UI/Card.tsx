
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  id?: string; // Allow id prop for accessibility or deep linking
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false, id }) => {
  const baseClasses = "bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden";
  const hoverClasses = hoverEffect ? "transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      id={id}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'aspect-square' | 'aspect-video' | 'aspect-[4/3]' | 'aspect-[3/4]';
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '', aspectRatio = 'aspect-video' }) => {
  return (
    <div className={`w-full ${aspectRatio} overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
};


interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4'; 
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', as = 'h3' }) => {
  const Tag = as;
  return <Tag className={`text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2 ${className}`}>{children}</Tag>;
};

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

export const CardActions: React.FC<CardActionsProps> = ({ children, className = ''}) => {
  return <div className={`px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-end space-x-3 ${className}`}>{children}</div>
}


export default Card;
