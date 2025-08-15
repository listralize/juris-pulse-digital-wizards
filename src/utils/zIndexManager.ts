// Z-Index Management Utility
// Defines consistent z-index levels across the application

export const zIndexLevels = {
  // Background elements
  background: -10,
  neuralBackground: -5,
  
  // Main content layers
  content: 1,
  sections: 10,
  
  // Interactive elements
  cards: 20,
  buttons: 30,
  
  // Overlays and dropdowns
  dropdown: 1000,
  modal: 5000,
  tooltip: 8000,
  
  // Navigation elements (highest priority)
  footer: 999998,
  navbar: 999999,
  mobileMenu: 999999,
  
  // Emergency override (use sparingly)
  maximum: 999999,
} as const;

// Helper function to get z-index value
export const getZIndex = (level: keyof typeof zIndexLevels): number => {
  return zIndexLevels[level];
};

// CSS custom properties for z-index levels
export const zIndexCSSVariables = {
  '--z-background': zIndexLevels.background.toString(),
  '--z-neural-background': zIndexLevels.neuralBackground.toString(),
  '--z-content': zIndexLevels.content.toString(),
  '--z-sections': zIndexLevels.sections.toString(),
  '--z-cards': zIndexLevels.cards.toString(),
  '--z-buttons': zIndexLevels.buttons.toString(),
  '--z-dropdown': zIndexLevels.dropdown.toString(),
  '--z-modal': zIndexLevels.modal.toString(),
  '--z-tooltip': zIndexLevels.tooltip.toString(),
  '--z-footer': zIndexLevels.footer.toString(),
  '--z-navbar': zIndexLevels.navbar.toString(),
  '--z-mobile-menu': zIndexLevels.mobileMenu.toString(),
  '--z-maximum': zIndexLevels.maximum.toString(),
} as const;

// Apply z-index CSS variables to root
export const applyZIndexVariables = () => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    Object.entries(zIndexCSSVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }
};