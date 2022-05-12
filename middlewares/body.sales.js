const joi = require('joi');

const schema = joi.array().items(
  joi.object({
    productId: joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: joi.number().required().messages({
      'any.required': '"quantity" is required',
    }),
  }),
);

function validBody(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}

module.exports = validBody;