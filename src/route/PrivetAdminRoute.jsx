

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivetAdminRoute = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("adtoken"));

    if (!token) {
        return <Navigate to="/admindashboardlogin" replace />;
    }

    return children;
};

export default PrivetAdminRoute;
