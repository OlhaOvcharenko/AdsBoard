const Joi = require('joi');

const schemaValidation = Joi.object({
  cleanTitle: Joi.string()
  .min(10)
  .max(50)
  .required(),

  cleanDescription: Joi.string()
  .min(20)
  .max(1000)
  .required(),

  cleanLocation: Joi.string()
  .required(),

  cleanAuthor: Joi.string()
  .required(),

  cleanDate: Joi.string()
  .required(),

  price: Joi.number()
  .required(),

  fileType: Joi.string().valid('image/png', 'image/jpeg', 'image/gif')
  .required(),
});

module.exports = schemaValidation;