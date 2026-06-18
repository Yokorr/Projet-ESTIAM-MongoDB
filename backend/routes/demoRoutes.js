import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// 1. Jointure avec $lookup
router.get('/lookup', async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $lookup: {
          from: 'reviews', // collection in db
          localField: '_id',
          foreignField: 'productId',
          as: 'productReviews'
        }
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplierInfo'
        }
      },
      { $limit: 3 }
    ]);
    res.json({
      title: 'Jointure avec $lookup (Produits + Avis + Fournisseur)',
      query: `Product.aggregate([
  { $lookup: { from: 'reviews', localField: '_id', foreignField: 'productId', as: 'productReviews' } },
  { $lookup: { from: 'suppliers', localField: 'supplierId', foreignField: '_id', as: 'supplierInfo' } }
])`,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Filtres avancés, Projections, Tris
router.get('/advanced-query', async (req, res) => {
  try {
    const data = await Product.find({ price: { $gt: 50 }, stock: { $lte: 200 } })
      .select('name price stock categoryId -_id') // Projection
      .sort({ price: -1 }) // Tri décroissant
      .limit(5);
      
    res.json({
      title: 'Filtres avancés ($gt, $lte), Projection, Tri',
      query: `Product.find({ price: { $gt: 50 }, stock: { $lte: 200 } })
  .select('name price stock categoryId -_id')
  .sort({ price: -1 })`,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Agrégation avec $group
router.get('/aggregate-group', async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          totalRevenue: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          averageOrderValue: { $avg: '$totalAmount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);
    res.json({
      title: 'Agrégation $group (Statistiques des Commandes par Statut)',
      query: `Order.aggregate([
  { $group: { _id: '$status', totalRevenue: { $sum: '$totalAmount' }, orderCount: { $sum: 1 }, averageOrderValue: { $avg: '$totalAmount' } } },
  { $sort: { totalRevenue: -1 } }
])`,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
