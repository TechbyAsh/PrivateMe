export const Colors = {
  light: {
    primary: '#6B46C1',
    secondary: '#4C51BF',
    accent: '#38B2AC',
    background: '#F7FAFC',
    surface: '#FFFFFF',
    text: '#1A202C',
    textSecondary: '#718096',
    border: '#E2E8F0',
    error: '#F56565',
    success: '#48BB78',
    warning: '#ED8936',
    info: '#4299E1',
  },
  dark: {
    primary: '#805AD5',
    secondary: '#667EEA',
    accent: '#4FD1C5',
    background: '#1A202C',
    surface: '#2D3748',
    text: '#F7FAFC',
    textSecondary: '#A0AEC0',
    border: '#4A5568',
    error: '#FC8181',
    success: '#68D391',
    warning: '#F6AD55',
    info: '#63B3ED',
  },
};

export const NoteColors = {
  default: {
    light: '#E2E8F0',
    dark: '#4A5568',
  },
  red: {
    light: '#FED7D7',
    dark: '#742A2A',
  },
  orange: {
    light: '#FEEBC8',
    dark: '#7C2D12',
  },
  yellow: {
    light: '#FEFCBF',
    dark: '#744210',
  },
  green: {
    light: '#C6F6D5',
    dark: '#22543D',
  },
  blue: {
    light: '#BEE3F8',
    dark: '#2C5282',
  },
  purple: {
    light: '#E9D8FD',
    dark: '#44337A',
  },
  pink: {
    light: '#FED7E2',
    dark: '#702459',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
