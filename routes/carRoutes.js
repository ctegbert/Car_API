const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     responses:
 *       200:
 *         description: A list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/cars', carController.getAllCars);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Add a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created successfully
 */
router.post('/cars', carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 */
router.put('/cars/:id', carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */
router.delete('/cars/:id', carController.deleteCar);

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - price
 *         - mileage
 *         - color
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: integer
 *         price:
 *           type: number
 *         mileage:
 *           type: integer
 *         color:
 *           type: string
 *         description:
 *           type: string
 */

module.exports = router;
