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
    <div>
      <h2>Saved Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, idx) => (
            <tr key={idx}>
              <td>{invoice.customer.name}</td>
              <td>${invoice.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedInvoices;
