
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
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(e as any);
        }
      }}
      className={`relative px-3 py-2 font-medium transition-all duration-300 text-sm group focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isActive
          ? (isDark ? 'text-white focus:ring-white/30' : 'text-black focus:ring-black/30')
          : (isDark ? 'text-white/70 hover:text-white focus:text-white focus:ring-white/30' : 'text-black/70 hover:text-black focus:text-black focus:ring-black/30')
      }`}
      aria-current={isActive ? 'page' : undefined}
      role="menuitem"
    >
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
        isActive
          ? (isDark ? 'bg-white' : 'bg-black')
          : 'bg-transparent group-hover:bg-current group-hover:opacity-50 group-focus:bg-current group-focus:opacity-50'
      }`} />
    </Link>
  );
};

export default NavigationItem;
