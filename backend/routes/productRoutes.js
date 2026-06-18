import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js'; // Nécessaire pour le .populate()

const router = express.Router();

// Route pour récupérer tous les produits dynamiquement
router.get('/', async (req, res) => {
  try {
    // Le .populate() permet de ramener le nom de la catégorie (grâce à la clé étrangère categoryId)
    const products = await Product.find()
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 }); // Les plus récents en premier
      
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
