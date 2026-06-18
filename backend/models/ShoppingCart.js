import mongoose from 'mongoose';

const shoppingCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}, {
  timestamps: true
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
export default ShoppingCart;
