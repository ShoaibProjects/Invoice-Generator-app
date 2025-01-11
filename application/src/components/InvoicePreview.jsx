import React from 'react';

const InvoicePreview = ({ customer, products }) => {
  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div>
      <h2>Invoice Preview</h2>
      <h3>Customer: {customer.name}</h3>
      <h3>Address: {customer.address}</h3>
      <h3>Contact: {customer.contact}</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={idx}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>${p.price * p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default InvoicePreview;
