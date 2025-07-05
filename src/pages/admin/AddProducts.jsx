import React, { useState } from 'react';
import { addProduct } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('electronics');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newProduct = { name, price: parseFloat(price), image, category, description };
        await addProduct(newProduct);
        setLoading(false);
        navigate('/admin/manage-products');
    };

    return (
        <div className="min-h-screen bg-gray-100 w-screen overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    <button
                        onClick={() => navigate('/admin/manage-products')}
                        className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
                    >
                        Manage Products
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Product Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Kitchen</option>
                            {/* Add more categories if needed */}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 mt-6 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} rounded-lg transition-colors`}
                        disabled={loading}
                    >
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
