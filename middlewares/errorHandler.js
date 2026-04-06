module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Error interno del servidor',
  };
  if (err.detail) payload.detail = err.detail;
  res.status(status).json(payload);
};