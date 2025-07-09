import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/firebase';
import ProductCard from '../../components/customer/ProductCard';
import { Search, Filter, Loader, Menu } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => onClick(product.id)}
        >
            <ProductCard product={product} />
        </div>
    ));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-screen overflow-x-hidden">
            {/* Location Text Navbar - Optimized */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 w-full py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Store Location: San Miguel Sto Tomas Batangas Philippines</span>
                </div>
            </nav>

            {/* Simple Navigation - Optimized */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
                            <button className="md:hidden p-2 text-gray-500 dark:text-gray-400">
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Page Header with Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Products</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Discover our premium collection
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Toilet Bowl</option>
                                <option value="clothing">Basin/Labatory</option>
                                <option value="home">Home & Kitchen</option>
                                <option value="shower">Shower Enclosure</option>
                            </select>
                        </div>
                        {/* Price Range */}
                        <div className="flex gap-4">
                            <input
                                type="number"
                                placeholder="Min Price"
                                className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Products Grid - Optimized */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin h-12 w-12 text-blue-500" />
                    </div>
                ) : debouncedFilteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {debouncedFilteredProducts.map(product => (
                            <ProductCardWrapper
                                key={product.id}
                                product={product}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchTerm ? 'Try different search terms' : 'No products available'}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer - Optimized */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="mb-4">
                                <Logo />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your trusted partner for premium products and exceptional shopping experience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a></li>
                                <li><a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Products</a></li>
                                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Products;