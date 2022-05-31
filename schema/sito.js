const Joi = require("joi");

module.exports = Joi.object({
    "tipologia": Joi.string().max(2, 'utf8').required(),
    "denominazioneSito": Joi.string().max(100, 'utf8').required(),
    "indirizzo": Joi.string().max(100, 'utf8').required(),
    "cap": Joi.string().max(10, 'utf8').required(),
    "codiceComune": Joi.string().max(7, 'utf8').allow(null),
    "codiceProvincia": Joi.string().max(3, 'utf8').allow(null),
    "codiceRegione": Joi.string().max(3, 'utf8').allow(null),
});