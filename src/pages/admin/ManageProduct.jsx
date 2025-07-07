import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, updateProduct, setProductAsFeatured, getFeaturedProducts } from "../../services/firebase";
import ProductTable from "../../components/admin/ProductTable";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [featuredProducts, setFeaturedProducts] = useState([]);  // Store featured products
    const navigate = useNavigate();

    // Fetch products from Firebase
    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);

    // Fetch featured products
    useEffect(() => {
        const loadFeaturedProducts = async () => {
            const featuredData = await getFeaturedProducts();  // Fetch the featured products
            setFeaturedProducts(featuredData);
        };
        loadFeaturedProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (id) => {
        setLoading(true);
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
        setLoading(false);
    };

    // Handle product update (editing)
    const handleUpdate = async (id, updatedProduct) => {
        setLoading(true);
        try {
            await updateProduct(id, updatedProduct); // Update in Firestore
            setProducts(products.map((product) => product.id === id ? updatedProduct : product)); // Update the state
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setEditingProduct(null); // Reset editing state
            setLoading(false);
        }
    };

    // Handle navigation to Add Product page
    const navigateToAddProduct = () => {
        navigate('/admin/add-products'); // Navigate to Add Product page
    };

    // Handle filtered products (by search term and category)
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Handle setting a product as featured
    const handleSetFeatured = async (product) => {
        if (featuredProducts.length >= 6) {
            alert("You can only add up to 6 featured products.");
            return;
        }

        await setProductAsFeatured(product);  // Add the product to the featured list
        setFeaturedProducts([...featuredProducts, product]); // Update state
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Manage Products</h1>

            {/* Flex container to position the search bar and filter button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-600 dark:text-gray-400">Product List</h2>

                {/* Add Product Button */}
                <button
                    onClick={navigateToAddProduct}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Add Product
                </button>
            </div>

            {/* Search Bar and Category Filter */}
            <div className="flex items-center gap-4 mb-6">
                {/* Search Input */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="pl-4 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home & Kitchen</option>
                    </select>
                </div>
            </div>

            {/* Display the filtered product table */}
            <ProductTable
                products={filteredProducts} // Pass the filtered products
                onDelete={handleDelete}
                onEdit={setEditingProduct} // Set the product to be edited
                loading={loading}
                editingProduct={editingProduct} // Pass the product to be edited
                onUpdate={handleUpdate} // Update the product
                onSetFeatured={handleSetFeatured} // Pass the featured product handler
            />
        </div>
    );
};

export default ManageProducts;