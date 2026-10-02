const validate = (schema) => async (req, res, next) => {
    req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    next();

}

module.exports = validate;