import React, { useState, useEffect } from 'react';
import {
    Users,
    Package,
    Plus,
    Shield,
    LogOut,
    TrendingUp,
    Activity,
    Bell,
    Search,
    Settings,
    BarChart3,
    Eye,
    Calendar,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const Dashboard = () => {
    const [uid, setUid] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState(3);
    const [dashboardStats, setDashboardStats] = useState({
        totalProducts: 100,
        totalUsers: 1250,
        totalOrders: 347,
        revenue: 12450
    });

    // Simulated real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setDashboardStats(prev => ({
                ...prev,
                totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
                totalOrders: prev.totalOrders + Math.floor(Math.random() * 2)
            }));
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const grantAdminRole = () => {
        if (!uid.trim()) {
            setMessage('Please enter a valid UID');
            setMessageType('error');
            return;
        }

        // Simulate API call since we can't actually make the request in this environment
        setTimeout(() => {
            setMessage('Admin role granted successfully');
            setMessageType('success');
            setUid(''); // Clear the input
        }, 1000);
    };

    const logout = () => {
        // Simulate logout
        setMessage('Logged out successfully');
        setMessageType('success');
    };

    const navigateToPage = (path) => {
        // Since we can't use useNavigate in this environment, we'll simulate navigation
        // In your actual app, you would use: navigate(path);
        window.location.href = path;
    };

    const StatCard = ({ title, value, icon: Icon, color, change }) => (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
                    {change && (
                        <p className="text-sm text-green-600 flex items-center mt-1">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{change}% from last month
                        </p>
                    )}
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
                    <Icon className="w-8 h-8" style={{ color }} />
                </div>
            </div>
        </div>
    );

    const ActionButton = ({ onClick, color, hoverColor, icon: Icon, children, className = "" }) => {
        const baseClasses = `inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer ${className}`;
        const colorClasses = `${color} ${hoverColor} text-white`;

        return (
            <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
                <Icon className="w-5 h-5 mr-2" />
                {children}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <div className="flex items-center space-x-2">
                                <Activity className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-gray-600">Live</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
                                {notifications > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {notifications}
                                    </span>
                                )}
                            </div>

                            {/* Settings */}
                            <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Products"
                        value={dashboardStats.totalProducts}
                        icon={Package}
                        color="#3B82F6"
                        change="12"
                    />
                    <StatCard
                        title="Total Users"
                        value={dashboardStats.totalUsers}
                        icon={Users}
                        color="#10B981"
                        change="8"
                    />
                    <StatCard
                        title="Total Orders"
                        value={dashboardStats.totalOrders}
                        icon={BarChart3}
                        color="#F59E0B"
                        change="15"
                    />
                    <StatCard
                        title="Revenue ($)"
                        value={dashboardStats.revenue}
                        icon={TrendingUp}
                        color="#8B5CF6"
                        change="22"
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Activity className="w-6 h-6 mr-2 text-blue-600" />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ActionButton
                            onClick={() => navigateToPage('/admin/manage-products')}
                            color="bg-blue-600"
                            hoverColor="hover:bg-blue-700"
                            icon={Package}
                        >
                            Manage Products
                        </ActionButton>
                        <ActionButton
                            onClick={() => navigateToPage('/admin/add-products')}
                            color="bg-green-600"
                            hoverColor="hover:bg-green-700"
                            icon={Plus}
                        >
                            Add Product
                        </ActionButton>
                        <ActionButton
                            onClick={() => navigateToPage('Analytics')}
                            color="bg-purple-600"
                            hoverColor="hover:bg-purple-700"
                            icon={BarChart3}
                        >
                            View Analytics
                        </ActionButton>
                        <ActionButton
                            onClick={() => navigateToPage('Orders')}
                            color="bg-orange-600"
                            hoverColor="hover:bg-orange-700"
                            icon={Eye}
                        >
                            View Orders
                        </ActionButton>
                    </div>
                </div>

                {/* Admin Role Management */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-yellow-600" />
                        Grant Admin Role
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Enter User UID"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                        </div>
                        <ActionButton
                            onClick={grantAdminRole}
                            color="bg-yellow-600"
                            hoverColor="hover:bg-yellow-700"
                            icon={Shield}
                        >
                            Grant Admin Role
                        </ActionButton>
                    </div>

                    {message && (
                        <div className={`mt-4 p-4 rounded-lg flex items-center ${messageType === 'success'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                            }`}>
                            {messageType === 'success' ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                            )}
                            <p className={messageType === 'success' ? 'text-green-700' : 'text-red-700'}>
                                {message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">New product added: "Wireless Headphones"</span>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">Order #12345 processed</span>
                            </div>
                            <span className="text-sm text-gray-500">4 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">Admin role granted to user</span>
                            </div>
                            <span className="text-sm text-gray-500">6 hours ago</span>
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Activity className="w-6 h-6 mr-2 text-green-600" />
                        System Status
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">Database</span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">API Server</span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                <span className="text-gray-800">Payment Gateway</span>
                            </div>
                            <span className="text-sm text-yellow-600 font-medium">Maintenance</span>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="text-center">
                    <ActionButton
                        onClick={logout}
                        color="bg-red-600"
                        hoverColor="hover:bg-red-700"
                        icon={LogOut}
                        className="transform hover:scale-105"
                    >
                        Logout
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;