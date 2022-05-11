const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(5),
  quantity: joi.number().min(1),
});

function validContent(req, res, next) {
  const { name, quantity } = req.body;
  const { error } = schema.validate({ name, quantity });
  if (error) return res.status(422).json({ message: error.message });
  next();
}

module.exports = validContent;