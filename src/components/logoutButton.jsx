import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out');
                navigate("/login"); // Redirect to login after logout
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
