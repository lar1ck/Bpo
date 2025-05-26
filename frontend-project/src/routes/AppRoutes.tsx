import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../components/Protected/Dashboard';
// import SparePartPage from '../pages/SparePartPage';
// import StockInPage from '../pages/StockInPage';
// import StockOutPage from '../pages/StockOutPage';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    <Route 
      path="/dashboard/*" 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } 
    />
  </Routes>
);

export default AppRoutes;
