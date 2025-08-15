// Production security utilities
export class DevToolsProtection {
  private static isProduction = process.env.NODE_ENV === 'production';
  private static devToolsOpen = false;
  
  static init() {
    if (!this.isProduction) return;
    
    // Disable console in production
    this.disableConsole();
    
    // Monitor dev tools
    this.monitorDevTools();
    
    // Disable keyboard shortcuts
    this.disableKeyboardShortcuts();
    
    // Disable right click
    this.disableRightClick();
    
    // Clear console periodically
    this.clearConsolePeriodically();
  }
  
  private static disableConsole() {
    const noop = () => {};
    const console = window.console;
    
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.dir = noop;
    console.dirxml = noop;
    console.group = noop;
    console.groupCollapsed = noop;
    console.groupEnd = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.timeLog = noop;
    console.trace = noop;
    console.assert = noop;
    console.clear = noop;
    console.count = noop;
    console.countReset = noop;
    console.table = noop;
  }
  
  private static monitorDevTools() {
    setInterval(() => {
      const threshold = 160;
      
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!this.devToolsOpen) {
          this.devToolsOpen = true;
          this.handleDevToolsDetected();
        }
      } else {
        this.devToolsOpen = false;
      }
    }, 1000);
  }
  
  private static handleDevToolsDetected() {
    // Just clear console instead of breaking the page
    console.clear();
    console.log('%cAcesso não autorizado!', 'color: red; font-size: 20px; font-weight: bold;');
  }
  
  private static disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Dev Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+K (Web Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
      }
      
      // F5 (Refresh) - Allow but clear console
      if (e.keyCode === 116) {
        setTimeout(() => window.console.clear(), 100);
      }
    });
  }
  
  private static disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
    
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  }
  
  private static clearConsolePeriodically() {
    setInterval(() => {
      window.console.clear();
    }, 2000);
  }
}

// Anti-debugging techniques
export class AntiDebug {
  static init() {
    if (process.env.NODE_ENV !== 'production') return;
    
    // Detect debugging
    this.detectDebugger();
    
    // Detect breakpoints
    this.detectBreakpoints();
  }
  
  private static detectDebugger() {
    setInterval(() => {
      const start = performance.now();
      try {
        debugger; // This will pause if dev tools are open
      } catch (e) {
        // Ignore errors
      }
      const end = performance.now();
      
      if (end - start > 100) {
        // Just clear console instead of redirecting
        console.clear();
      }
    }, 5000);
  }
  
  private static detectBreakpoints() {
    // Simplified detection without breaking functionality
    const originalLog = console.log;
    console.log = function() {
      const trace = new Error().stack;
      if (trace && trace.includes('debugger')) {
        console.clear();
      }
      return originalLog.apply(console, arguments);
    };
  }
}