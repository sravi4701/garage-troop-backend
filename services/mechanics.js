const MechanicModel = require('../db_models/mechanics');

class Mechanics {
    async addMechanic(data) {
        try {
            const newGarage = new MechanicModel(data);
            return await newGarage.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Mechanics();
