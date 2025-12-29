import React from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const keyExists = localStorage.getItem('adminKey');
    if(!keyExists) {
        toast.error("Enter valid key first");
        return <Navigate to='/' replace />
    }
    
    return children;
}

export default ProtectedRoute