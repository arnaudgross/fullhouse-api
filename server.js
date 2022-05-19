const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


/* --- CORS --- */

var cors = require('cors');
app.use('/api', cors({
    origin:'http://localhost:3001',
    optionsSuccessStatus:200
}));


/* --- BODY PARSER MIDDLEWARE --- */

app.use(express.urlencoded({extended:true}));
app.use(express.json());


/* --- ROUTES --- */

const apiRoutes = require('./api/routes/routes');
const apiKeyManager = require('./src/middlewares/ApiKeyManager');
app.use('/api', apiKeyManager, apiRoutes);


/* --- LISTENING --- */

app.listen(process.env.PORT, () => 
{
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});