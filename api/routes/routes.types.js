const express = require('express');
const router = express.Router();
const TypeController = require('../../src/controllers/TypeController.js');
const Controller = new TypeController();

// Récupére tous les utilisateurs
router.get('/', Controller.getAll);

// Récupére 1 utilisateur via son ID
router.get('/:type_id', Controller.getById);

// Création d'un utilisateur
router.post('/',  Controller.post);

// Modification d'un utilisateur via son ID
router.put('/:type_id', Controller.put);

// Suppression d'un utilisateur via son ID
router.delete('/:type_id', Controller.delete);

 
// Les autres méthodes sont donc non allouées
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:type_id').all((req,res) => { res.status(405).send(); });

module.exports = router;