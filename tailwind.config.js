module.exports = {
  purge: {
    enabled: true,
    content: [
      './dist/**/*.html'
    ],
    options: {
      whitelist: ['overflow-hidden'],
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
