module.exports = {
  purge: {
    enabled: true,
    content: [
      './dist/**/*.html'
    ],
    options: {
      whitelist: ['overflow-hidden', 'w-2/5', 'w-1/5'],
    }
  },
  theme: {
    extend: {},
  },
  variants: {
    container: [],
  },
  plugins: [],
  corePlugins: {
    container: false,
  }
}
