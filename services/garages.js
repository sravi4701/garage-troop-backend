const _ = require('lodash');
const GarageModel = require('../db_models/garages');

class Garages {
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

    // FIXME: Not working
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
}

module.exports = new Garages();
