const isDev = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.includes('lovable.app'));

export const logger = {
  log: (...args: any[]) => { if (isDev) console.log(...args); },
  warn: (...args: any[]) => { if (isDev) console.warn(...args); },
  error: (...args: any[]) => console.error(...args), // Always log errors
  info: (...args: any[]) => { if (isDev) console.info(...args); },
  debug: (...args: any[]) => { if (isDev) console.debug(...args); },
};
