import React, { useState } from 'react';
import { addProduct } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newProduct = { name, price: parseFloat(price), image };
        await addProduct(newProduct);
        setLoading(false);
        navigate('/admin/manage-products');
    };

    return (
        <div className="min-h-screen bg-gray-100 w-screen overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 w-full">
                <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>

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