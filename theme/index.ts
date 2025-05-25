import type { Theme as DripsyTheme } from 'dripsy';

export const theme: DripsyTheme = {
  colors: {
    text: '#ffffff',
    background: '#121212',
    primary: '#9B59B6', // new purple primary
    secondary: '#1E1E1E',
    muted: '#888888',
    error: '#ff5252',
    border: '#444444',
    placeholder: '#999999',
    buttonDisabled: '#333333',
  },
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  radii: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 9999,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  fonts: {
    body: 'System',
    heading: 'System',
  },
  text: {
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
  },
};
