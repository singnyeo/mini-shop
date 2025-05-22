const logger = (req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;