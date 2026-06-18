import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0, index: true },
  stock: { type: Number, required: true, min: 0 },
  imageUrl: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  specifications: { type: Map, of: String }
}, {
  timestamps: true
});

// Creating a compound index for efficient querying
productSchema.index({ categoryId: 1, price: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
