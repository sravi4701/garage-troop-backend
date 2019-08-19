const conn = require('../modules/db');
const mongoose = require('mongoose');
const _ = require('lodash');
const Utils = require('../utils');

const { MechanicSchema } = require('./mechanics');

const { Schema } = mongoose;

const SchemaTypes = Utils.schemaTypes();

const GarageSchema = new Schema({
    name: SchemaTypes.MANDATORY_STRING,
    avatar: SchemaTypes.MANDATORY_STRING,
    category: SchemaTypes.OPTIONAL_STRING,
    no_of_services: _.defaults({ default: 0 }, SchemaTypes.MANDATORY_NUMBER),
    address: SchemaTypes.MANDATORY_STRING,
    pincode: SchemaTypes.OPTIONAL_STRING,
    location: SchemaTypes.POINT_COORDINATES,
    about_us: {}, // p1, p2, p3
    opening_time: {}, // MON: '9AM-3PM'
    portfolio: [SchemaTypes.MANDATORY_STRING],
    experties: [SchemaTypes.MANDATORY_STRING],
    badges: [{
        name: SchemaTypes.MANDATORY_STRING,
        icon: SchemaTypes.MANDATORY_STRING
    }],
    services: [SchemaTypes.MANDATORY_STRING],
    media: {
        source: SchemaTypes.OPTIONAL_STRING,
        thumbnail: SchemaTypes.OPTIONAL_STRING
    },
    mechanics: [{ type: MechanicSchema, required: false }],
    established_since: SchemaTypes.OPTIONAL_NUMBER // year
});

GarageSchema.index({ name: 1 });
GarageSchema.index({ location: '2dsphere' });

const GarageModel = conn.model('garages', GarageSchema);

module.exports = GarageModel;
