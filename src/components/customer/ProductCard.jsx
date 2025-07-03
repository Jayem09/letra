// src/components/customer/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="relative overflow-hidden">
                <img
                    src={product.image} // Render image from URL here
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₱{product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
