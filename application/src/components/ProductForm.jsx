import React, { useEffect, useState } from 'react';

const ProductForm = ({ refresh, customer, setProducts }) => {
  const [product, setProduct] = useState({ name: '', quantity: 0, price: 0 });
  const [productList, setProductList] = useState([]);

  const [error, setError] = useState('');

  const validate = () => {
    setError('');
    if (Object.keys(customer).length === 0) {
      setError('Customer details are required');
      return false;
    }
    if (!product.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (product.quantity==0) {
      setError('Quantity is required');
      return false;
    }
    else if (product.price==0) {
      setError('Prise is required');
      return false;
    }
    return true;
  };

  useEffect(() => {
     setProductList([]);
     setProducts([]);
  }, [refresh])

  const handleAddProduct = () => {
    if (validate()){
        setProductList([...productList, product]);
        setProducts([...productList, product]);
        setProduct({ name: '', quantity: 0, price: 0 });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product</h2>
      {error && <div className="p-2 w-full bg-red-300 mb-4 rounded text-white">{error}</div>}
      <div className="space-y-4">
        <div>
          <input
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
            <label htmlFor="quantity" className='font-semibold'>Quantity:</label>
          <input
            id='quantity'
            placeholder="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: +e.target.value })}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
           <label htmlFor="price" className='font-semibold'>Prise ($):</label>
          <input
            id='price'
            placeholder="Price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="text-center">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Product List</h3>
        <ul className="list-disc pl-5 space-y-2">
          {productList.map((p, idx) => (
            <li key={idx} className="text-gray-700">
              {p.name} - {p.quantity} @ ${p.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;
