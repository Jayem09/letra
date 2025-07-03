// src/pages/admin/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

                {/* Total Products Card */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">Total Products</h3>
                        {/* Replace '100' with dynamic count */}
                        <p className="text-2xl font-bold text-blue-600">100</p>
                    </div>
                </div>

                {/* Manage Products Link */}
                <div className="mt-12">
                    <Link
                        to="/admin/manage-products"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>

                {/* Add Product Link */}
                <div className="mt-4">
                    <Link
                        to="/admin/add-product"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Add Product
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
