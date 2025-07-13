import React, { useState } from 'react';
import { addProduct } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

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

        // Get the current user
        const auth = getAuth();
        const currentUser = auth.currentUser;

        const newProduct = {
            name,
            price: parseFloat(price),
            image,
            category,
            description,
            createdBy: currentUser?.email || 'Unknown' // <-- Add this line
        };

        await addProduct(newProduct);
        setLoading(false);
        navigate('/admin/manage-products');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Add New Product</h1>

            {/* Header section with description and manage products button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-gray-600 dark:text-gray-400">Create a new product</h2>

                {/* Manage Products Button */}
                <button
                    onClick={() => navigate('/admin/manage-products')}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                    Manage Products
                </button>
            </div>

            {/* Form Container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Price and Category Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Price (₱)
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                required
                            >
                                <option value="electronics">Toilet Bowl</option>
                                <option value="clothing">Basin/Laboratory</option>
                                <option value="home">Home & Kitchen</option>
                                <option value="shower">Shower Enclosure</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Product Image URL
                        </label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {image && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image Preview:</p>
                                <img
                                    src={image}
                                    alt="Product preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical"
                            placeholder="Enter product description..."
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/manage-products')}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${loading
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding Product...
                                </span>
                            ) : (
                                'Add Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;