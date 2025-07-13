import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/firebase';
import ProductCard from '../../components/customer/ProductCard';
import { Search, Filter, Loader, Menu, ChevronRight, X } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate();

    // Optimize Firebase loading with error handling
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error loading products:", error);
                // Show user-friendly error message
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Memoize expensive filtering operations
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || product.category === filter;
            const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) &&
                (!maxPrice || product.price <= parseFloat(maxPrice));
            return matchesSearch && matchesFilter && matchesPrice;
        });
    }, [products, searchTerm, filter, minPrice, maxPrice]);

    // Debounce search to reduce excessive filtering
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Use debounced search term in filtering
    const debouncedFilteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || product.category === filter;
            const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) &&
                (!maxPrice || product.price <= parseFloat(maxPrice));
            return matchesSearch && matchesFilter && matchesPrice;
        });
    }, [products, debouncedSearchTerm, filter, minPrice, maxPrice]);

    // Memoize callbacks to prevent unnecessary re-renders
    const handleProductClick = useCallback((productId) => {
        navigate(`/product/${productId}`);
    }, [navigate]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleFilterChange = useCallback((e) => {
        setFilter(e.target.value);
    }, []);

    const handleMinPriceChange = useCallback((e) => {
        setMinPrice(e.target.value);
    }, []);

    const handleMaxPriceChange = useCallback((e) => {
        setMaxPrice(e.target.value);
    }, []);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setFilter('all');
        setMinPrice('');
        setMaxPrice('');
    }, []);

    // Memoize Logo component
    const Logo = React.memo(() => (
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
    ));

    // Memoize ProductCard wrapper to prevent re-renders
    const ProductCardWrapper = React.memo(({ product, onClick }) => (
        <div
            className="cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
            onClick={() => onClick(product.id)}
        >
            <ProductCard product={product} />
        </div>
    ));

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
                                <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
                                <a href="/products" className="text-gray-900 dark:text-white font-medium">Products</a>
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
                            Our <span className="text-blue-600 dark:text-blue-400">Products</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover our premium collection of quality products
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
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={filter}
                                onChange={handleFilterChange}
                                className="pl-12 pr-8 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200"
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Toilet Bowl</option>
                                <option value="clothing">Basin/Laboratory</option>
                                <option value="home">Home & Kitchen</option>
                                <option value="shower">Shower Enclosure</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden px-4 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {/* Advanced Filters - Mobile */}
                    {showFilters && (
                        <div className="lg:hidden bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Price Range</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all duration-200"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all duration-200"
                                />
                            </div>
                        </div>
                    )}

                    {/* Advanced Filters - Desktop */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                                className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all duration-200"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                                className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all duration-200"
                            />
                        </div>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {debouncedFilteredProducts.length} Products Found
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchTerm ? `Searching for "${searchTerm}"` : 'Browse our complete collection'}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Showing {debouncedFilteredProducts.length} of {products.length} products</span>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <LoadingSkeleton />
                ) : debouncedFilteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {debouncedFilteredProducts.map(product => (
                            <ProductCardWrapper
                                key={product.id}
                                product={product}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No products found</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                            {searchTerm ? 'Try adjusting your search terms or filters' : 'No products available at the moment'}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
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

export default Products;