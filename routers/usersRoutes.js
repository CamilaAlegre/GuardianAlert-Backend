const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Retornando todos los usuarios
router.get("/",usersController.getAllUsers);

//Retornando un usuario dado su id
router.get("/:id", usersController.getByIdUser);

//Crear un usuario
router.post('/register', usersController.createUser);

//Login
router.post("/login",usersController.login);

//Actualizar un usuario
router.put("/:id",(req, res, next) => req.app.verifyToken(req, res, next), usersController.updateUser);

//Eliminar
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next) ,usersController.deleteUser);

module.exports = router;