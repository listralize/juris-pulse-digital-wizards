
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';

interface NavigationItemProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavigationItem = ({ to, label, isActive, onClick }: NavigationItemProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 font-medium transition-colors border-b-2 ${
        isActive
          ? (isDark ? 'border-white text-white' : 'border-black text-black')
          : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
      }`}
    >
      {label}
    </Link>
  );
};

export default NavigationItem;
