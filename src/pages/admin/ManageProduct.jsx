import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getProducts, deleteProduct, updateProduct } from '../../services/firebase';
import ProductTable from '../../components/admin/ProductTable';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate hook

    // Fetch products from Firebase
    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (id) => {
        setLoading(true);
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        setLoading(false);
    };

    // Handle product update (editing)
    const handleUpdate = async (id, updatedProduct) => {
        setLoading(true);
        try {
            await updateProduct(id, updatedProduct); // Update in Firestore
            setProducts(products.map(product => product.id === id ? updatedProduct : product)); // Update the state
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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Manage Products</h1>

            {/* Flex container to position button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-600 dark:text-gray-400">Product List</h2>
                <button
                    onClick={navigateToAddProduct}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Add Product
                </button>
            </div>

            <ProductTable
                products={products}
                onDelete={handleDelete}
                onEdit={setEditingProduct} // Set the product to be edited
                loading={loading}
                editingProduct={editingProduct} // Pass the product to be edited
                onUpdate={handleUpdate} // Update the product
            />
        </div>
    );
};

export default ManageProducts;
