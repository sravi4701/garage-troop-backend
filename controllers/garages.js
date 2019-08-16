const garageService = require('../services/garages');

const StandardResponse = require('../utils').getStandardResponse;

class Garages {

    extractStandardOptions(req) {
        const options = {};
        const query = req.query;
        if (query.sort) {
            options.sort = query.sort;
        }
        if (query.limit) {
            options.limit = Number(query.limit);
        }
        if (query.skip) {
            options.skip = Number(query.skip);
        }
        if (query.offset) {
            options.skip = Number(query.offset);
        }
        return options;
    }

    async handleAddGarages(req, res, next) {
        try {
            const resData = await garageService.addGarage(req.body);
            return res.send(StandardResponse(resData));
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }

    async handleAddManyGarages(req, res, next) {
        try {
            const resData = await garageService.addManyGarages(req.body);
            return res.send(StandardResponse(resData));
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }

    async handleAddMechanic(req, res, next) {
        try {
            const id = req.params.id;
            const resData = await garageService.addMechanics(id, req.body);
            return res.send(StandardResponse(resData));
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }

    async handleGetById(req, res, next) {
        try {
            const id = req.params.id;
            const resData = await garageService.getGarageByQuery({ _id: id });
            return res.send(StandardResponse(resData));
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }

    async handleGetAllGarages(req, res, next) {
        try {
            const { sort, limit, skip } = this.extractStandardOptions(req);
            const resData = await garageService.getAllGarages({}, { sort, limit, skip });
            return res.send(StandardResponse(resData.data, resData.meta));
        } catch (error) {
            return res.status(400).send({ error: true, message: error.message });
        }
    }
}

module.exports = new Garages();
