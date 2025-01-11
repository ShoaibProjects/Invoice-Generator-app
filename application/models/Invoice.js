import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customer: {
    name: String,
    address: String,
    contact: String,
  },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
