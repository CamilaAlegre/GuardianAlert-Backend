const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Retornando todos los usuarios
router.get("/",usersController.getAllUsers);

//Retornando un usuario dado su id
router.get("/:id", usersController.getByIdUser);

//se envia token y devuelve id de usuario
router.post('/token', usersController.extractUserId, (req, res) => {
    const userId = req.userId; // Se accede al ID de usuario obtenido del middleware extractUserId
    
    console.log(userId)
    
    if (!userId) {
      return res.status(401).json({ message: 'No se proporcionó un ID de usuario' });
    }
    // Respondemos con el ID del usuario
    console.log(res)
    res.status(200).json({ userId });
});

//Crear un usuario
router.post('/register', usersController.createUser);

//Login
router.post("/login",usersController.login);

//Actualizar un usuario
router.put("/:id", usersController.updateUser);

//Eliminar
router.delete("/:id",(req, res, next) => req.app.verifyToken(req, res, next) ,usersController.deleteUser);

module.exports = router;