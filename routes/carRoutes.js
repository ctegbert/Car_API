const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/cars', carController.getAllCars);
router.post('/cars', carController.createCar);

router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);


module.exports = router;
