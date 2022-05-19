const express = require('express');
const router = express.Router();
const UserController = require('../../src/controllers/UserController.js');
const Controller = new UserController();

// Récupére tous les utilisateurs
router.get('/', Controller.getAll);

// Récupére 1 utilisateur via son ID
router.get('/:user_id', Controller.getById);

// Création d'un utilisateur
router.post('/',  Controller.post);

// Modification d'un utilisateur via son ID
router.put('/:user_id', Controller.put);

// Suppression d'un utilisateur via son ID
router.delete('/:user_id', Controller.delete);

 
// Les autres méthodes sont donc non allouées
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:user_id').all((req,res) => { res.status(405).send(); });

module.exports = router;