import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import SparePartPage from '../../pages/SparePartPage';
import StockInPage from '../../pages/StockInPage';
import StockOutPage from '../../pages/StockOutPage';
import DailyStockOutReportPage from '../../pages/DailyStockOutReportPage';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-3">
            <NavLink 
              to="/dashboard/spare-parts" 
              className={({ isActive }) => 
                isActive ? 'font-bold underline' : ''
              }
            >
              Spare Parts
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink 
              to="/dashboard/stock-in" 
              className={({ isActive }) => 
                isActive ? 'font-bold underline' : ''
              }
            >
              Stock In
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/stock-out" 
              className={({ isActive }) => 
                isActive ? 'font-bold underline' : ''
              }
            >
              Stock Out
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/stock-out-report" 
              className={({ isActive }) => 
                isActive ? 'font-bold underline' : ''
              }
            >
              Report
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main content area */}
      <main className="flex-grow p-6 overflow-auto">
        <Routes>
          <Route path="spare-parts" element={<SparePartPage />} />
          <Route path="stock-in" element={<StockInPage />} />
          <Route path="stock-out" element={<StockOutPage />} />
          <Route path="stock-out-report" element={<DailyStockOutReportPage />} />
          <Route path="*" element={<p>Select a section from the sidebar.</p>} />
        </Routes>   
      </main>
    </div>
  );
};

export default Dashboard;
