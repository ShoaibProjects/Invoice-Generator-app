import React, { useState } from 'react';

const ProductForm = ({ setProducts }) => {
  const [product, setProduct] = useState({ name: '', quantity: 0, price: 0 });
  const [productList, setProductList] = useState([]);

  const handleAddProduct = () => {
    setProductList([...productList, product]);
    setProducts([...productList, product]);
    setProduct({ name: '', quantity: 0, price: 0 });
  };

  return (
    <div>
      <h2>Product Details</h2>
      <input placeholder="Product Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="Quantity" type="number" onChange={(e) => setProduct({ ...product, quantity: +e.target.value })} />
      <input placeholder="Price" type="number" onChange={(e) => setProduct({ ...product, price: +e.target.value })} />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {productList.map((p, idx) => (
          <li key={idx}>{p.name} - {p.quantity} @ ${p.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
