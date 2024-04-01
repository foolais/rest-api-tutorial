const Joi = require('joi');

const createProductsValidation = (payload) => {
  const schema = Joi.object({
    nama: Joi.string().required(),
    harga: Joi.number().required(),
    keterangan: Joi.string().allow('').default(''),
    status: Joi.string().required().valid('tersedia', 'habis')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createProductsValidation };
