import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, Heart, Star, Plus } from "lucide-react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState('all');

    // Mock products for demonstration
    useEffect(() => {
        const mockProducts = [
            { id: 1, name: "Premium Headphones", price: 199.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.5 },
            { id: 2, name: "Wireless Earbuds", price: 89.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.2 },
            { id: 3, name: "Smart Watch", price: 299.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.8 },
            { id: 4, name: "Bluetooth Speaker", price: 79.99, category: "electronics", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.3 },
            { id: 5, name: "Cotton T-Shirt", price: 29.99, category: "clothing", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.1 },
            { id: 6, name: "Coffee Maker", price: 149.99, category: "home", image: "https://www.luzonfoundryinc.com/images/products/thumb/sp01%20(1).png", rating: 4.6 },
        ];

        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter products based on search and category
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === 'all' || product.category === filterCategory)
    );

    // Function to safely format the price
    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return price.toFixed(2);  // Format to 2 decimal places
        }
        return 'N/A';  // Return 'N/A' if the price is invalid
    };

    const ProductCard = ({ product }) => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {product.name}
                </h3>

                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        ₱{formatPrice(product.price)}
                    </span>
                    {/* <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                        Add to Cart
                    </button> */}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Location Text Navbar - Centered */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 w-full py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Store Location: San Miguel Sto Tomas Batangas Philippines</span>
                </div>
            </nav>

            {/* Simple Navigation */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                                ShopLogo
                            </a>
                            <div className="hidden md:flex ml-10 space-x-8">
                                <a href="/" className="text-gray-900 dark:text-white font-medium">Home</a>
                                <a href="/products" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Products</a>
                                <a href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <User className="w-5 h-5" />
                            </button>
                            <button className="md:hidden p-2 text-gray-500 dark:text-gray-400">
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome to Our Store
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Discover amazing products with great prices and quality
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl text-gray-600 dark:text-gray-400">Featured Products</h2>

                    <a
                        href="/products"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        View All Products
                    </a>
                </div>

                {/* Search Bar and Category Filter */}
                <div className="flex items-center gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-4 pr-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Kitchen</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                                <div className="bg-gray-300 dark:bg-gray-600 h-48 rounded mb-4"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-6 rounded mb-2"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-4"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-8 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms or category filter</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ShopLogo</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your trusted partner for premium products and exceptional shopping experience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Home</a></li>
                                <li><a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Products</a></li>
                                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
