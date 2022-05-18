module.exports = {
    devServer: {
      proxy: {
        '/api': 'http://127.0.0.1:8000',
      },
    },
  };