import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  }
}, {
  timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
