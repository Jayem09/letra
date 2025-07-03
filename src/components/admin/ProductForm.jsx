import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'sinks',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ name: '', description: '', price: '', image: '', category: 'sinks' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300"
      />
      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300"
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300"
      />
      <select
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300"
      >
        <option value="sinks">Sinks</option>
        <option value="faucets">Faucets</option>
        <option value="tiles">Tiles</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Add Product</button>
    </form>
  );
};

export default ProductForm;
