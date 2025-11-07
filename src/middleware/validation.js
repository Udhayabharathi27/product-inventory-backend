const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }

  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }

  if (!stock || isNaN(stock) || stock < 0) {
    return res.status(400).json({ error: 'Valid stock quantity is required' });
  }

  next();
};

module.exports = { validateProduct };