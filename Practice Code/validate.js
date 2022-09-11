const joi = require('joi');
module.exports = function schemaFunc(data) {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        number: joi.number().required(),
        isActive: joi.boolean().required(),
    });

    return schema.validate(data)
}