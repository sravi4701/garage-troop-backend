const conn = require('../modules/db');
const mongoose = require('mongoose');
const Utils = require('../utils');

const { Schema } = mongoose;

const SchemaTypes = Utils.schemaTypes();

const MechanicSchema = new Schema({
    name: SchemaTypes.MANDATORY_STRING,
    avatar: SchemaTypes.MANDATORY_STRING
});

const MechanicModel = conn.model('mechanics', MechanicSchema);

module.exports = { MechanicModel, MechanicSchema };
