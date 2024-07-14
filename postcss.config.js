module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        // consistent with tailwind
        // 'mantine-breakpoint-xs': '36em',
        // 'mantine-breakpoint-sm': '48em',
        // 'mantine-breakpoint-md': '62em',
        // 'mantine-breakpoint-lg': '75em',
        // 'mantine-breakpoint-xl': '88em',
        'mantine-breakpoint-xs': '640px', // sm
        'mantine-breakpoint-sm': '768px', // md
        'mantine-breakpoint-md': '1024px', // lg
        'mantine-breakpoint-lg': '1280px', // xl
        'mantine-breakpoint-xl': '1536px', // 2xl
      },
    },
  },
};
