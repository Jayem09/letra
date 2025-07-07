import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-medium text-gray-900">Admin Dashboard</h1>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigateToPage('')}
                        className="w-full px-4 py-3 text-left text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Customer Dashboard
                    </button>

                    <button
                        onClick={() => navigateToPage('admin/manage-products')}
                        className="w-full px-4 py-3 text-left text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Manage Products
                    </button>

                    <button
                        onClick={() => navigateToPage('admin/add-products')}
                        className="w-full px-4 py-3 text-left text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Add Products
                    </button>

                    <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={logOut}
                            className="w-full px-4 py-3 text-left text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;