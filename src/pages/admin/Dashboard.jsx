import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUser(user);
            const checkUserRole = async () => {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    setIsAdmin(true);
                } else {
                    navigate('/unauthorized');
                }
            };
            checkUserRole();
        } else {
            navigate('/login');
        }
    }, [auth, db, navigate]);

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const navigateToPage = (page) => {
        navigate(`/${page}`);
    };

    const menuItems = [
        {
            title: 'Customer Dashboard',
            description: 'View the customer-facing website',
            icon: '🏠',
            path: '',
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700'
        },
        {
            title: 'Manage Products',
            description: 'Edit, delete, and organize your products',
            icon: '📦',
            path: 'admin/manage-products',
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700'
        },
        {
            title: 'Add Products',
            description: 'Create new products for your store',
            icon: '➕',
            path: 'admin/add-products',
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Admin Dashboard
                            </h1>
                            {user && (
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Welcome back, {user.email}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={logOut}
                            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                            <span className="mr-2">🚪</span>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigateToPage(item.path)}
                            className="group cursor-pointer transform transition-all duration-200 hover:scale-105"
                        >
                            <div className={`bg-gradient-to-r ${item.color} ${item.hoverColor} rounded-xl shadow-lg p-6 text-white transition-all duration-200 hover:shadow-xl`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">{item.icon}</span>
                                    <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-blue-100 opacity-90">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Loading...</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <span className="text-2xl">⭐</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Loading...</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin Status</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <span className="mr-3">🕒</span>
                                <span>Dashboard accessed</span>
                                <span className="ml-auto">Just now</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <span className="mr-3">🔐</span>
                                <span>Admin authentication successful</span>
                                <span className="ml-auto">Just now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;