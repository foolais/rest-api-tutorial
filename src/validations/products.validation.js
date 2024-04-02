const Joi = require('joi');

const createProductsValidation = (payload) => {
  const schema = Joi.object({
    product_id: Joi.number(),
    nama: Joi.string().required(),
    harga: Joi.number().required(),
    keterangan: Joi.string().allow('', null).default(''),
    status: Joi.string().required().valid('tersedia', 'habis')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus {{#valids}}'
  });

  return schema.validate(payload);
};

const updateProductValidation = (payload) => {
  const schema = Joi.object({
    nama: Joi.string().allow('', null),
    harga: Joi.number().allow('', null),
    keterangan: Joi.string().allow('').default(''),
    status: Joi.string().valid('tersedia', 'habis').default('tersedia')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createProductsValidation, updateProductValidation };
