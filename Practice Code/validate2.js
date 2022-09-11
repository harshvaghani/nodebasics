const Joi = require('joi');
module.exports = function validator(data) {
    const validation = Joi.object({
        name: Joi.string().required(),
        rank: Joi.number().required(),
    });

    return validation.validate(data)
}