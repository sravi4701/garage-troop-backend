const router = require('express').Router();
const GarageController = require('../controllers/garages');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isValidSecretKey, GarageController.handleGetAllGarages.bind(GarageController));
router.get('/:id', GarageController.handleGetById.bind(GarageController));
router.post('/', authMiddleware.isValidSecretKey, GarageController.handleAddGarages.bind(GarageController));
router.post('/multi', authMiddleware.isValidSecretKey, GarageController.handleAddManyGarages.bind(GarageController));
router.post('/:id/mechanic', authMiddleware.isValidSecretKey, GarageController.handleAddMechanic.bind(GarageController));

module.exports = router;
