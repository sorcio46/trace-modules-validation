require('dotenv').config();
const fs = require('fs');
const _ = require('lodash');
const logger = require('./logger');

const sitoLogistico = require('./schema/sitoLogistico')
const eserczioCommerciale = require('./schema/esercizioCommerciale');

const validationOptions = {
    abortEarly: false,  // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
};

const SCHEMAS = {
    'esercizioCommerciale': eserczioCommerciale,
    'sitoLogistico': sitoLogistico
};

const readFile = (path) => {
    return fs.readFileSync(path, 'utf8');
}

const writeFile = (path, data) => {
    return fs.writeFileSync(path, data, 'utf8');
}

const readFolder = (path) => {
    return fs.readdirSync(path);
}

const validateModule = (module, path) => {
    let result = { result: true };
    try {
        validateSchema(result, module, path);
        return result;
    } catch (err) {
        logger.error('Item validation failed:', err.message);
        return { result: false, ...result, reason: err.message };
    }
}

/**
 *
 * @param result
 * @param item
 * @param schemaKey
 * @returns {{result: boolean, reason: undefined}|{result: boolean}}
 */
const validateSchema = (result, item, schemaKey) => {
    let schema = SCHEMAS[schemaKey];
    let validationResult = validate(item, schema);
    let errorDetails = _.get(validationResult, 'object.error.details')
    if(_.isUndefined(errorDetails))
        result[schemaKey] = { result: true };
    else {
        result['result'] = false;
        logger.error(JSON.stringify(errorDetails));
        result[schemaKey] = { result: false, reason: errorDetails }
    }
}

/**
 *
 * @param item
 * @param schema
 * @returns {null|*}
 */
const validate = (item, schema) => {
    try {
        let result = schema.validate(item, validationOptions);
        return { result: true, object: result };
    } catch (err) {
        logger.error('Item validation failed:', err.message);
        return { result: false, reason: err.message }
    }
}

const runBatch = (path) => {
    logger.info('Reading path', path);
    let fileNames = readFolder('input/' + path);
    _.pull(fileNames, '.gitignore');
    for(let i in fileNames) {
        let file = readFile('input/' + path + '/' + fileNames[i]);
        let module = JSON.parse(file);
        let validation = validateModule(module, path);
        writeFile('output/' + path + '/' + fileNames[i], JSON.stringify(validation));
    }
}

try {
    logger.info('Run started');
    runBatch('sitoLogistico');
    runBatch('esercizioCommerciale');
    logger.info('Run completed');
    process.exit(0);
} catch (err) {
    logger.error('Fatal error:', err.message);
    process.exit(1);
}