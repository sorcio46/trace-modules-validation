const Joi = require("joi");
const soggettoGiuridico = require("./soggettoGiuridico");
const esercizioCommercialeItem = require("./esercizioCommercialeItem");

module.exports = Joi.object({
    "soggettoGiuridico": soggettoGiuridico,
    "esercizioCommercialeList": Joi.array().items(esercizioCommercialeItem)
});