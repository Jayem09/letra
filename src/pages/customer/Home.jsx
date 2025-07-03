import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, Heart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";  // Import Link


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock products for demonstration
    useEffect(() => {
        const mockProducts = [
            { id: 1, name: "Premium Headphones", price: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", rating: 4.5 },
            { id: 2, name: "Wireless Earbuds", price: 89.99, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop", rating: 4.2 },
            { id: 3, name: "Smart Watch", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", rating: 4.8 },
            { id: 4, name: "Bluetooth Speaker", price: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", rating: 4.3 },
        ];

        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ProductCard = ({ product }) => (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
            </div>

            <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${product.price}
                    </span>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-screen overflow-x-hidden">
            {/* Enhanced Navbar */}
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 w-full">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <a href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ShopLogo
                            </a>
                            <div className="hidden md:flex space-x-8">
                                <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Home</a>
                                <a href="/products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Products</a>
                                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Categories</a>
                                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <ShoppingCart className="w-6 h-6" />
                            </button>
                            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <User className="w-6 h-6" />
                            </button>
                            <button className="md:hidden p-2 text-gray-700 dark:text-gray-300">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-24 w-screen">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Welcome to Our
                        <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Premium Store
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-2xl mx-auto leading-relaxed">
                        Discover amazing products with unbeatable prices and premium quality
                    </p>

                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full px-6 py-4 pl-12 pr-16 text-gray-700 bg-white/95 backdrop-blur-sm rounded-2xl border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-8 text-sm">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Products Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Featured Products
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Handpicked selection of our best products just for you
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
                                <div className="bg-gray-300 dark:bg-gray-600 h-48 rounded-lg mb-4"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-6 rounded mb-2"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-4"></div>
                                <div className="bg-gray-300 dark:bg-gray-600 h-8 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No products found</h3>
                                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Enhanced Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 w-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                ShopLogo
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                Your trusted partner for premium products and exceptional shopping experience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 ShopLogo. All Rights Reserved. Made with ❤️ for amazing customers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;