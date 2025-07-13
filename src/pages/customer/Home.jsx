import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, Heart, Star, Plus, ChevronRight, Filter } from "lucide-react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const mockProducts = [
            { id: 1, name: "Premium Headphones", price: 199.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.5 },
            { id: 2, name: "Wireless Earbuds", price: 89.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.2 },
            { id: 3, name: "Smart Watch", price: 299.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.8 },
            { id: 4, name: "Bluetooth Speaker", price: 79.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.3 },
            { id: 5, name: "Cotton T-Shirt", price: 29.99, category: "clothing", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.1 },
            { id: 6, name: "Coffee Maker", price: 149.99, category: "home", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.6 },
            { id: 7, name: "Coffee Maker", price: 149.99, category: "home", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.6 },
            { id: 8, name: "Coffee Maker", price: 149.99, category: "home", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.6 },
        ];

        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "all" || product.category === filterCategory)
    );

    const Logo = () => (
        <div className="flex items-center space-x-2">
            <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">EDAR</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">CMT</span>
            </div>
        </div>
    );

    const ProductCard = ({ product }) => (
        <div className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl overflow-hidden transform hover:scale-[1.02] max-w-sm mx-auto">
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description || "Premium quality product with modern design."}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ₱{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                ₱{product.originalPrice}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating || "4.5"}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-6 rounded mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">📍 San Miguel Sto Tomas Batangas Philippines</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <Logo />
                            </a>
                            <div className="hidden md:flex ml-10 space-x-8">
                                <a href="/" className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
                                <a href="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Products</a>
                                <a href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 space-y-2">
                        <a href="/" className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
                        <a href="/products" className="block py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Products</a>
                        <a href="/about" className="block py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Welcome to <span className="text-blue-600 dark:text-blue-400">EDAR CMT</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover amazing products with exceptional quality and unbeatable prices
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search and Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="pl-12 pr-8 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="home">Home & Kitchen</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
                        <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
                    </div>
                    <a
                        href="/products"
                        className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 group"
                    >
                        View All Products
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No products found</h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    Try adjusting your search terms or category filter to find what you're looking for
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="mb-6">
                                <Logo />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                Your trusted partner for premium products and exceptional shopping experience. Quality meets affordability.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                                <ul className="space-y-3">
                                    <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
                                    <li><a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Products</a></li>
                                    <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
                                <ul className="space-y-3">
                                    <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                                    <li><a href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shipping</a></li>
                                    <li><a href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Returns</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © 2024 EDAR CMT. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
