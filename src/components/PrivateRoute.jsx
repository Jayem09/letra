import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // No user logged in, redirect to login
                navigate("/login");
                return;
            }

            try {
                // Check if user has admin role in Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (userDoc.exists() && userDoc.data().role === "admin") {
                    setIsAdmin(true);
                    setLoading(false);
                } else {
                    // User is logged in but not admin, redirect to home or show error
                    navigate("/"); // or navigate("/unauthorized")
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate, db]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return null; // Will redirect anyway
    }

    return children;
};

export default PrivateRoute;