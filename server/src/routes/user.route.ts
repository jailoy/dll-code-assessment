import express from 'express';
const  userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/:id", userController.getUser);
router.get("/", userController.getUsers);

module.exports = router;

export default router;