const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
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

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     tags: [Cars]
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
router.get('/', carController.getAllCars);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
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
router.post('/', isAuthenticated, validateCar, carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
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
router.put('/:id', isAuthenticated, validateCar, carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', isAuthenticated, carController.deleteCar);

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
