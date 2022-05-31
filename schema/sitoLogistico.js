const Joi = require("joi");
const soggettoGiuridico = require("./soggettoGiuridico");
const sito = require("./sito");

module.exports = Joi.object({
    "soggettoGiuridico": soggettoGiuridico,
    "siti": Joi.array().items(sito),
});