import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate("/login");  // Redirect if not logged in
                return;
            }

            try {
                // Fetch the user's data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (userDoc.exists() && userDoc.data().role === "admin") {
                    setIsAdmin(true);
                    setLoading(false);
                } else {
                    navigate("/unauthorized");  // Redirect if not admin
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                navigate("/unauthorized");  // Redirect on error
            }
        });

        return () => unsubscribe();
    }, [auth, navigate, db]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return null; // If not admin, return null to render nothing
    }

    return children;
};

export default PrivateRoute;
