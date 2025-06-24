
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../sidebar/AppSidebar';
import WhatsAppButton from '../WhatsAppButton';
import { useTheme } from '../ThemeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <AppSidebar />
        <main className="flex-1 relative">
          <div className="p-2">
            <SidebarTrigger />
          </div>
          {children}
          <WhatsAppButton />
        </main>
      </div>
    </SidebarProvider>
  );
}
