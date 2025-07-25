import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-xl overflow-hidden transform hover:scale-[1.02]">
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Product Name */}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ease-in-out">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.description || "Premium quality product with excellent features and modern design."}
                </p>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
                            ₱{product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through transition-colors duration-300 ease-in-out">
                                ₱{product.originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Simple Rating */}
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400 transition-colors duration-300 ease-in-out" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 ease-in-out">
                            {product.rating || "4.5"}
                        </span>
                    </div>
                </div>

                {/* Add to Cart Button */}
                {/* You can uncomment the Add to Cart Button if needed */}
            </div>
        </div>
    );
};

export default ProductCard;
