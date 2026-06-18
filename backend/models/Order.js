import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, required: true }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
