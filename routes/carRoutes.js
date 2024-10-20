const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const carController = require('../controllers/carController');

// Validation Middleware
const validateCar = [
  check('make').notEmpty().withMessage('Make is required'),
  check('model').notEmpty().withMessage('Model is required'),
  check('year').isInt({ min: 1886 }).withMessage('Year must be an integer and realistic'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('mileage').isInt({ min: 0 }).withMessage('Mileage must be a non-negative integer'),
  check('color').notEmpty().withMessage('Color is required')
];

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
router.post('/cars', validateCar, carController.createCar);

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
router.put('/cars/:id', validateCar, carController.updateCar);

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
 *       204:
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
