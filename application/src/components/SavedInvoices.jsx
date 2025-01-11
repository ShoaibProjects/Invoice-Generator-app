import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Invoice History</h2>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-600">Customer</th>
            <th className="py-2 px-4 text-left text-gray-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-gray-700">{invoice.customer.name}</td>
              <td className="py-2 px-4 text-gray-700">${invoice.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedInvoices;
