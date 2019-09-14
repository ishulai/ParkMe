module.exports = (appEnv) => {
  return {
    default: (req, res) => {
      res.sendfile("index.html");
    }
  }
}