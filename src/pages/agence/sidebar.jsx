//scr/sidebar//

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaLock,
  FaEnvelope,
  FaBuilding,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
      <div className="text-center py-6 text-xl font-bold border-b border-gray-700">
        📁 Portail Agence
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          to="/agence/dashboard"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/dashboard') ? 'bg-gray-700' : ''
          }`}
        >
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* Utilisateurs */}
        <Link
          to="/agence/utilisateurs"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/utilisateurs') ? 'bg-gray-700' : ''
          }`}
        >
          <FaUsers /> Utilisateurs
        </Link>

        <Link
          to="/agence/roles"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/roles') ? 'bg-gray-700' : ''
          }`}
        >
          <FaUserShield /> Rôles
        </Link>

        <Link
          to="/agence/privileges"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/privileges') ? 'bg-gray-700' : ''
          }`}
        >
          <FaLock /> Privilèges
        </Link>

        {/* Courriers */}
        <Link
          to="/agence/courriers"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/courriers') ? 'bg-gray-700' : ''
          }`}
        >
          <FaEnvelope /> Courriers
        </Link>

        {/* Directions */}
        <Link
          to="/agence/directions"
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
            isActive('/agence/directions') ? 'bg-gray-700' : ''
          }`}
        >
          <FaBuilding /> Directions
        </Link>

        {/* Déconnexion */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/agence/login';
          }}
          className="flex items-center gap-2 p-2 mt-8 text-red-400 hover:bg-red-800 rounded"
        >
          <FaSignOutAlt /> Déconnexion
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
