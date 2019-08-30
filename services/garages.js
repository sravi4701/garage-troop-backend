const _ = require('lodash');
const GarageModel = require('../db_models/garages');
const appContants = require('../constants/app');

class Garages {
    standardSort() {
        return {
            'createdAt': -1
        };
    }

    async addGarage(data) {
        try {
            const newGarage = new GarageModel(data);
            return await newGarage.save();
        } catch (error) {
            throw error;
        }
    }

    // FIXME: response is not returning correct data
    async addManyGarages(data) {
        const results = [];
        _.each(data, async garageData => {
            try {
                const newGarage = new GarageModel(garageData);
                const result = await newGarage.save();
                console.log('result is', result);
                results.push(result);
            } catch (error) {
                results.push(error);
            }
        });
        console.log('return result', results);
        return results;
    }

    async addMechanics(id, data) {
        try {
            const garageData = await GarageModel.findOne({ _id: id });
            if (!garageData) {
                throw new Error('No garage found');
            }
            const mechanics = garageData.mechanics || [];
            const newMechanics = mechanics.concat(data.mechanics);
            garageData.mechanics = newMechanics;
            return await garageData.save();
        } catch (error) {
            throw error;
        }
    }

    async getGarageByQuery(query = {}) {
        try {
            const garageData = await GarageModel.findOne(query);
            return garageData;
        } catch (error) {
            throw error;
        }
    }

    async getAllGarages(query = {}, options = {}) {
        const limit = options.limit || appContants.STANDARD_LIST_LIMIT;
        const offset = options.skip || options.offset || appContants.DEFAULT_SKIP;
        const sort = options.sort || this.standardSort();
        try {
            if (query.lat && query.lng) {
                const lat = query.lat;
                const lng = query.lng;
                delete query.lat;
                delete query.lng;
                query.location = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        }
                    }
                };
            }
            const garages = await GarageModel.find(query).skip(offset).limit(limit).sort(sort);
            return {
                data: garages,
                meta: {
                    limit,
                    offset: offset + garages.length,
                    has_next: garages.length !== 0
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Garages();
