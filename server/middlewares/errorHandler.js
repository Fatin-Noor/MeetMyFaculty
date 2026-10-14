function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(error);
  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid record id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: "A record with this value already exists" });
  }
  res.status(error.statusCode || 500).json({ success: false, message: error.message || "Server error" });
}

module.exports = { notFound, errorHandler };

