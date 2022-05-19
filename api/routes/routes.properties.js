const express = require('express');
const router = express.Router();
const PropertyController = require('../../src/controllers/PropertyController.js');

// Récupére tous les utilisateurs
router.get('/', (req, res) =>
{
    (new PropertyController).getAll(req, res);
});

// Récupére 1 utilisateur via son ID
router.get('/:property_id', (req, res) =>
{
    (new PropertyController).getById(req, res);
});

// Création d'un utilisateur
router.post('/', (req, res) =>
{
    (new PropertyController).post(req, res);
});

// Modification d'un utilisateur via son ID
router.put('/:property_id', (req, res) =>
{
    (new PropertyController).put(req, res);
});

// Suppression d'un utilisateur via son ID
router.delete('/:property_id', (req, res) =>
{
    (new PropertyController).delete(req, res);
});

 
// Les autres méthodes sont donc non allouées
router.route('/').all((req,res) => { res.status(405).send(); });
router.route('/:property_id').all((req,res) => { res.status(405).send(); });

module.exports = router;