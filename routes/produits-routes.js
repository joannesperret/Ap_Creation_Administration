const express = require('express');

// Import de la connexion à MySQL
const mysql = require('../database/mysql');

// Import de la promesse
const promise = require('../database/mysql');

// Extraction du router depuis Express
const router = express.Router();

// Route d'affichage d'ajout d'un produit
// avec alimentation des catégories

router.get('/addProduit', (req, res) => {
  mysql.db.query('SELECT * FROM categorie order by categorie',
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
        mysql.db.close();
      } else {
        const produitList = result;
        res.render('../views/addProduit', { produitList });
        console.log(produitList);
      }
    });    
});

// Route d'ajout d'un produit
// Création de l'article
router.post('/addProduit',(req, res) => {
  const donnees = {
    designation: req.body.designation,
    description: req.body.description,
    prix: req.body.prix,
    qte_stockee: req.body.qte_stockee,
    categorie: req.body.categorie
    };
  mysql.query('Insert INTO produits SET ?', [donnees],(err, data) => {
    res.status(200).json(data);
  });
    
res.redirect('/produits');  
  
});

router.get('/film/:id([0-9]+)', (req, res) => {
  mysql.query(
    'SELECT * FROM films WHERE id=?',
    [req.params.id],
    (err, data) => {
      res.status(200).json(data);
    }
  );
});


// Route de suppression d'un produit
router.get('/:id', (req, res) => {
  mysql.db.query('DELETE FROM produits WHERE id_produit = ?',req.params.id);
  res.redirect('/');
 });


// Route d'affichage des produits
router.get('/', (req, res) => {
  mysql.query('SELECT * FROM produits as pr JOIN photos as ph ON pr.id_produit = ph.id_produit order by designation',
  (err, result) => {
  if(err){
  res.status(500).json({error: err});
 mysql.close();
  } else {
  const productList = result;
  res.render('../views/product',{productList});
 // console.log(productList);
      }
  });
 });




// Exportation des routes
module.exports = router;
