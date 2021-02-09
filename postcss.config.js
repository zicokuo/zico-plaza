module.exports = function () {
  return {
    plugins: [
      require("autoprefixer")({
        browsers: [">0%"],
      }),
    ],
  }
}
