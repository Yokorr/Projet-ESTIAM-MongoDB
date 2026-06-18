import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  method: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], required: true },
  transactionId: { type: String, required: true }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
