import React, { useState } from 'react';


const CustomerForm = ({ handleRef, setCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const [error, setError] = useState('');

  const handleRefresh = () => {
    setFormData({ name: '', address: '', contact: '' });
    handleRef()
  }
  const validate = () => {
    setError('');
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.contact.trim()) {
      setError('Contact is required');
      return false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      setError('Contact must be a valid 10-digit number');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (validate()) {
        setCustomer(formData);
      }     
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Details</h2>
      {error && <div className="p-2 w-full bg-red-300 mb-4 rounded text-white">{error}</div>}
      <div className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2 md:gap-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Customer
        </button>
        <button
          onClick={handleRefresh}
          className="bg-red-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default CustomerForm;
