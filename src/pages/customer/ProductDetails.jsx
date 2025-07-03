// src/pages/customer/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/firebase";

const ProductDetail = () => {
    const { id } = useParams();  // Extract product id from URL
    console.log(id);  // Log the product ID to check if it's correct
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(id);  // Fetch product by ID
            setProduct(productData);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex items-center my-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-2 text-gray-600">{product.rating}</span>
                    </div>
                    <p className="text-lg text-gray-700 my-4">{product.description}</p>
                    <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
                    <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
