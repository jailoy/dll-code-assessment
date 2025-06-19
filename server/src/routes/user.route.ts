import express from 'express';
const userController = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users with optional pagination and sorting
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "name"
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: asc | desc
 *           example: "asc"
 *         description: Ascending or Descending
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Invalid option'
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Not Found'
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Retrieve a user by their id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Invalid option'
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Not Found'
 */
router.get("/:id", userController.getUser);

export default router;