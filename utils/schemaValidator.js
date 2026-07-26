const Ajv = require('ajv');

function validateSchema(schema,data){
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    return validate(data);
}

module.exports = validateSchema;