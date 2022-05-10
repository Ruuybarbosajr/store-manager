function error(err, req, res, _next) {
  if (err.status) return res.status(err.status).json({ message: err.message });
  console.log(err.message);
  return res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = error;