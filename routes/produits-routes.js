const express = require('express');

// Import de la connexion à MySQL
const mysql = require('../database/mysql');

// Extraction du router depuis Express
const router = express.Router();

// Route d'affichage d'ajout d'un produit
// avec alimentation des catégories

router.get('/addProduit', async (req, res) => {
  await mysql.db.query('SELECT * FROM categorie order by categorie',
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

router.post('/addProduit', (req, res) => {
  const data = {
    designation: req.body.designation,
    description: req.body.description,
    prix: req.body.prix,
    qte_stockee: req.body.qte_stockee,
    categorie: req.body.categorie
    };
  mysql.query('INSERT INTO produits SET ?', [data]);
  
  res.redirect('/produits');
  
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
  console.log(productList);
      }
  });
 });


// Route de suppression d'un produit
router.get('/:id', (req, res) => {
  mysql.db.query('DELETE FROM produits WHERE id_produit = ?',req.params.id);
  res.redirect('/');
 });

// Exportation des routes
module.exports = router;
