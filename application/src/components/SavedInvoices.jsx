import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedInvoices = (derivedData) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://invoice-generator-app-assignment.vercel.app/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, [derivedData]);

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      const response = await axios.delete(`https://invoice-generator-app-assignment.vercel.app/api/invoices/${invoiceId}`);
      alert('Invoice deleted successfully!');
      setInvoices(invoices.filter(invoice => invoice._id !== invoiceId)); // Update UI to reflect deleted invoice
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Failed to delete invoice.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Invoice History</h2>

    <div className='overflow-scroll'>
    <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600">Customer</th>
            <th className="py-2 px-4 text-left text-gray-600">Total</th>
            <th className="py-2 px-4 text-left text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-gray-700">{invoice.customer.name}</td>
              <td className="py-2 px-4 text-gray-700">${invoice.total.toFixed(2)}</td>
              <td className='text-right'>
                <button className='bg-red-500 text-white font-semibold rounded px-2 py-1 hover:bg-red-600' onClick={() => handleDeleteInvoice(invoice._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SavedInvoices;
