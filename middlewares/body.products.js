const joi = require('joi');

const schema = joi.object({
  name: joi.string().required(),
  quantity: joi.number().required(),
});

function validBody(req, res, next) {
  const { name, quantity } = req.body;
  const { error } = schema.validate({ name, quantity });
  if (error) return res.status(400).json({ message: error.message });
  next();
}

module.exports = validBody;