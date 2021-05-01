const express = require('express');

// Import de la connexion à MySQL
const mysql = require('../database/mysql');

// Extraction du router depuis Express
const router = express.Router();

// Route d'ajout d'un concert

router.post('/addConcert', (req, res) => {
  mysql.query('INSERT INTO concerts SET ?', req.body);
  res.redirect('/concerts');
});

// Route d'affichage d'ajout d'un concert

router.get('/addConcert', async (req, res, next) => {
  await mysql.db.query('SELECT * FROM groupes', 
  (err, result) => {
  if(err){
  res.status(500).json({error: err});
 mysql.db.close();
  } else {
    const groupeList = result;    
  res.render('../views/addConcert',{groupeList});
  next();    
  console.log(groupeList);  
        }        
  });  
});


router.get('/addConcert', async (req, res) => {
  const lieuList= await mysql.db.query('SELECT * FROM lieux', 
  (err, resultLieux) => {
  if(err){
  res.status(500).json({error: err});
 mysql.db.close();
  } else {
  const lieuList = resultLieux;
  res.render('../views/addConcert',{lieuList});
  console.log(lieuList);  
        }
  });
});

// Route d'affichage des produits
router.get('/produits', (req, res) => {
  mysql.db.query('SELECT * FROM produits as pr JOIN photos as ph ON pr.id_produit = ph.id_produit WHERE role_id = 1 order by designation', 
  (err, result) => {
  if(err){
  res.status(500).json({error: err});
 mysql.db.close();
  } else {
  const productList = result;
  res.render('../views/product',{productList});
  console.log(productList);
      }
  });
 });




// Route de suppression d'un produit
router.get('/produits/:id', (req, res) => {
  mysql.db.query('DELETE FROM produits WHERE id_produit = ?',req.params.id);
  res.redirect('/produits');
 });

   
router.get('/addConcert', (req, res) => {

  res.render('../views/addConcert');
  
      }); 
 
// Exportation des routes
module.exports = router;
