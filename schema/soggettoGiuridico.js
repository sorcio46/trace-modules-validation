const Joi = require("joi");

module.exports = Joi.object({
    "partitaIva": Joi.string().max(14, 'utf8').required(),
    "ragioneSociale": Joi.string().max(400, 'utf8').required(),
    "codiceNazione": Joi.string().max(3, 'utf8').allow(null),
    "indirizzo": Joi.string().max(100, 'utf8').required(),
    "numeroCivico": Joi.string().max(20, 'utf8').allow(null),
    "scalaInterno": Joi.string().max(50, 'utf8').allow(null),
    "cap": Joi.string().max(20, 'utf8').required(),
    "telefono": Joi.string().max(15, 'utf8').allow(null),
    "pec": Joi.string().max(60, 'utf8').allow(null),
    "toponomastica": Joi.string().max(50, 'utf8').allow(null),
    "codiceRegione": Joi.string().max(3, 'utf8').allow(null),
    "codiceProvincia": Joi.string().max(3, 'utf8').allow(null),
    "codiceComune": Joi.string().max(7, 'utf8').allow(null)
});