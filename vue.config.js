module.exports = {
  devServer: {
      proxy: {
          '/assets': {
            target: 'http://192.168.124.7:5000/'
          }
        }
  }
}