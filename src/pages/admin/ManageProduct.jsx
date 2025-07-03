// src/pages/admin/ManageProducts.jsx
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/firebase';
import ProductTable from '../../components/admin/ProductTable';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await getProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Manage Products</h1>
            <ProductTable products={products} onDelete={handleDelete} />
        </div>
    );
};

export default ManageProducts;
