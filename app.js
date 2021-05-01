// import du module express
const express = require('express');


// Import du module body-parser pour récupérer les données postées
const bodyParser = require('body-parser');

// Import des routes
const concertsRoutes = require('./routes/concerts-routes');

// Création de l'application
const app = express();


// Middlewares qui s'appliqueront à toutes les routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/assets', express.static('assets/product'));
app.use('/css', express.static('css'));
app.use('/product', express.static('../Api_Creation/img/product'));
// app.use(express.static('assets/product'));

// Utilisation de du moteur de template pug
app.set('view engine', 'pug');

// Gestion des routes
app.use('/', concertsRoutes);

// Lancement de l'application
app.listen(3000, () => console.log('app started'));