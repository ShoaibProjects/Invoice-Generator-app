import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import ProductForm from './components/ProductForm';
import InvoicePreview from './components/InvoicePreview';
import SavedInvoices from './components/SavedInvoices';
import axios from 'axios';

const App = () => {
  const [customer, setCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const handleSaveInvoice = async () => {
    const subtotal = products.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const invoice = { customer, products, total };
    
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', invoice);
      alert('Invoice saved successfully!');
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Basic Invoice Generator</h1>

        <div className="space-y-6">
          <div className="bg-slate-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h2>
            <CustomerForm setCustomer={setCustomer} />
          </div>

          <div className="bg-slate-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Details</h2>
            <ProductForm setProducts={setProducts} />
          </div>

          <div className="bg-slate-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Invoice Preview</h2>
            <InvoicePreview customer={customer} products={products} />
          </div>

          <div className="text-center">
            <button
              onClick={handleSaveInvoice}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Invoice
            </button>
          </div>

          <div className="bg-gray-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Invoices</h2>
            <SavedInvoices invoices={invoices} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
