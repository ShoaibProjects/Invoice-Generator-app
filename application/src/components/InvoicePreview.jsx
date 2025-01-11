import React from 'react';
import { jsPDF } from 'jspdf';

const InvoicePreview = ({ customer, products }) => {
  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  // Company Name (static in this example)
  const companyName = "MyCompany Inc.";

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Title style
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text('Invoice', 10, 10);
  
    // Company name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Company: MyCompany Inc.", 10, 20); // Company name
  
    // Date and Time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 10, 30); // Date
    doc.text(`Time: ${formattedTime}`, 10, 40); // Time
  
    // Customer info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Customer: ${customer.name}`, 10, 50);
    doc.text(`Address: ${customer.address}`, 10, 60);
  
    // Products table (with borders and alternating row colors)
    const startY = 70;
    const lineHeight = 10;
    let currentY = startY;
  
    // Table header
    doc.setFontSize(14);
    doc.setFillColor(220, 220, 220);  // Light grey background for the header
    doc.rect(10, currentY - 5, 190, lineHeight, 'F');  // Draw header background
    doc.setFont("helvetica", "bold");
    doc.text("Product", 15, currentY);
    doc.text("Quantity", 90, currentY, { align: "center" });
    doc.text("Price", 150, currentY, { align: "right" });
  
    currentY += lineHeight;
  
    // Products rows
    doc.setFont("helvetica", "normal");
    products.forEach((product, index) => {
      // Alternate row colors
      if (index % 2 === 0) {
        doc.setFillColor(240, 240, 240); // Lighter background for even rows
      } else {
        doc.setFillColor(255, 255, 255); // White background for odd rows
      }
      
      // Draw product row background
      doc.rect(10, currentY - 5, 190, lineHeight, 'F');
  
      // Product info
      doc.setFontSize(12);
      doc.text(product.name, 15, currentY);
      doc.text(String(product.quantity), 90, currentY, { align: "center" });
      doc.text(`$${product.price.toFixed(2)}`, 150, currentY, { align: "right" });
  
      currentY += lineHeight;
    });
  
    // Subtotal, tax, and total section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255);  // White background for totals
  
    // Draw a line above totals
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, currentY, 200, currentY);
    currentY += 5;
  
    // Display Subtotal
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, currentY);
    currentY += lineHeight;
  
    // Display Tax
    doc.text(`Tax (10%): $${tax.toFixed(2)}`, 10, currentY);
    currentY += lineHeight;
  
    // Display Total
    doc.text(`Total: $${total.toFixed(2)}`, 10, currentY);
  
    // Save the PDF
    doc.save('invoice.pdf');
  };
  


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className='flex justify-center md:justify-between'>
      <h2 className="hidden md:block text-2xl font-semibold text-gray-800 mb-6">Invoice</h2>
      <button 
        onClick={downloadPDF} 
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-200 mb-4"
      >
        Download as PDF
      </button>
      </div>
      <div className="mb-4">
      <div className="mb-2">
        <h3 className="text-xl font-medium text-gray-700">{companyName}</h3>
        <p className="text-gray-600 text-sm">Date: {formattedDate}</p>
        <p className="text-gray-600 text-sm">Time: {formattedTime}</p>
      </div>
        <h3 className="text-xl font-medium text-gray-700">Customer Details</h3>
        <p className="text-gray-600">Name: {customer.name}</p>
        <p className="text-gray-600">Address: {customer.address}</p>
        <p className="text-gray-600">Contact: {customer.contact}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Product</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Price</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={idx} className="odd:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{p.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{p.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">${(p.price * p.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-gray-700">Subtotal:</span>
          <span className="text-lg font-medium text-gray-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-gray-700">Tax (10%):</span>
          <span className="text-lg font-medium text-gray-800">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t-2 border-gray-200 pt-4">
          <span className="text-xl font-semibold text-gray-700">Total:</span>
          <span className="text-xl font-semibold text-gray-800">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
