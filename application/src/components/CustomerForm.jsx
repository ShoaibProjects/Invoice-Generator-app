import React, { useState } from 'react';

const CustomerForm = ({ setCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setCustomer(formData);
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <button onClick={handleSubmit}>Add Customer</button>
    </div>
  );
};

export default CustomerForm;
