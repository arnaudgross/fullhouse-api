const express = require('express');
const router = express.Router(); 


/* --- USERS --- */
const apiUsersRoutes = require('./routes.users.js');
router.use('/users', apiUsersRoutes);


/* --- PROPERTIES TYPES --- */
const apiTypesRoutes = require('./routes.types.js');
router.use('/properties/types', apiTypesRoutes);

/* --- PROPERTIES --- */
const apiPropertiesRoutes = require('./routes.properties.js');
router.use('/properties', apiPropertiesRoutes);

 
// Si une route n'existe pas, erreur 404
router.route("*").all((req,res) => { res.status(404).send(); });
module.exports = router;