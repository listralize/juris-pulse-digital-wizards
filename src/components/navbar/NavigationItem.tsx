
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
      className={`relative px-3 py-2 font-medium transition-all duration-300 text-sm group ${
        isActive
          ? (isDark ? 'text-white' : 'text-black')
          : (isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black')
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
        isActive
          ? (isDark ? 'bg-white' : 'bg-black')
          : 'bg-transparent group-hover:bg-current group-hover:opacity-50'
      }`} />
    </Link>
  );
};

export default NavigationItem;
