// Theme.js - Centralized theme for FinalsApp

const Theme = {
  // Main color palette
  colors: {
    primary: '#3498db',        // Blue - primary color
    secondary: '#2ecc71',      // Green - secondary color
    accent: '#9b59b6',         // Purple - accent color
    background: '#f5f9ff',     // Light blue background
    surface: '#ffffff',        // White surface
    darkText: '#2c3e50',       // Dark blue text
    lightText: '#ecf0f1',      // Light text
    danger: '#e74c3c',         // Red for warnings/errors
    warning: '#f39c12',        // Orange for warnings
    shadow: '#bdc3c7',         // Shadow color
    success: '#27ae60',        // Darker green for success messages
    headerBg: 'rgba(52, 152, 219, 0.05)', // Very light blue for headers
  },

  // Typography
  typography: {
    fontSizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
      xxlarge: 32,
      xxxlarge: 48,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },

  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },

  // Border Radii
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 25,
    xxl: 32,
    round: 100,
  },

  // Shadows
  shadows: {
    small: {
      shadowColor: '#bdc3c7',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#bdc3c7',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#bdc3c7',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
  },

  // Common component styles
  components: {
    header: {
      height: 70,
      paddingTop: 30,
      paddingHorizontal: 20,
    },
    card: {
      padding: 20,
      borderRadius: 15,
      backgroundColor: '#fff',
    },
    button: {
      primary: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
      },
      secondary: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
    },
  },
};

export default Theme; 