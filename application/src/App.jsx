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
    <div>
      <h1>Basic Invoice Generator</h1>
      <CustomerForm setCustomer={setCustomer} />
      <ProductForm setProducts={setProducts} />
      <InvoicePreview customer={customer} products={products} />
      <button onClick={handleSaveInvoice}>Save Invoice</button>
      <SavedInvoices invoices={invoices} />
    </div>
  );
};

export default App;
