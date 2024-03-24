import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  // add custom theme
  defaultRadius: 0,
  fontFamily: "'Roboto', sans-serif",
  colors: {
    brand: ['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#868e96', '#495057', '#343a40', '#212529'],
  },
  components: {
    Button: {
      styles: () => ({
        root: {
          fontWeight: 500,
          color: '#000',
        },
      }),
    },
    ActionButton: {
      styles: () => ({
        root: {
          color: '#000',
        },
      }),
    },
  },
  primaryColor: 'brand',
};

export default theme;
