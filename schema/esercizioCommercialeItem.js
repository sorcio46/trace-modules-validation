const Joi = require("joi");

module.exports = Joi.object({
    "scalaInterno": Joi.string().max(20, 'utf8').allow(null)
});