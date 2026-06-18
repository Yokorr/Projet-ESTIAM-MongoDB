import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true } // Snapshot of price
}, {
  timestamps: true
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;
