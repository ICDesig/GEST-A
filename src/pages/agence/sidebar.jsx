import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Lock, 
  Mail, 
  Building2, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  // Simulation de useLocation pour la démo
  const [currentPath, setCurrentPath] = useState('/agence/dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path) => currentPath.startsWith(path);

  const menuItems = [
    {
      path: '/agence/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      color: 'text-blue-400'
    },
    {
      path: '/agence/utilisateurs',
      icon: Users,
      label: 'Utilisateurs',
      color: 'text-green-400'
    },
    {
      path: '/agence/roles',
      icon: Shield,
      label: 'Rôles',
      color: 'text-purple-400'
    },
    {
      path: '/agence/privileges',
      icon: Lock,
      label: 'Privilèges',
      color: 'text-orange-400'
    },
    {
      path: '/agence/courriers',
      icon: Mail,
      label: 'Courriers',
      color: 'text-cyan-400'
    },
    {
      path: '/agence/directions',
      icon: Building2,
      label: 'Directions',
      color: 'text-indigo-400'
    }
  ];

  const handleNavigation = (path) => {
    setCurrentPath(path);
    // Ici vous utiliseriez navigate(path) avec React Router
    console.log(`Navigation vers: ${path}`);
  };

  const handleLogout = () => {
    // localStorage.removeItem('token');
    // window.location.href = '/agence/login';
    console.log('Déconnexion...');
    alert('Déconnexion simulée');
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white fixed left-0 top-0 transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-700`}>
      {/* Header */}
      <div className="relative">
        <div className={`flex items-center justify-center py-6 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm ${isCollapsed ? 'px-4' : 'px-6'}`}>
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Portail Agence
                </h1>
                <p className="text-xs text-slate-400">Gestion administrative</p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full p-1.5 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <div key={item.path} className="relative group">
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 shadow-lg'
                    : 'hover:bg-slate-700/50 hover:shadow-md'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className={`${active ? item.color : 'text-slate-400 group-hover:text-white'} transition-colors duration-200`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                {!isCollapsed && (
                  <span className={`font-medium ${active ? 'text-white' : 'text-slate-300 group-hover:text-white'} transition-colors duration-200`}>
                    {item.label}
                  </span>
                )}

                {active && !isCollapsed && (
                  <div className="absolute right-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  </div>
                )}
              </button>

              {/* Tooltip pour mode collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-600 shadow-lg z-50">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="my-6 border-t border-slate-700"></div>

        {/* Logout Button */}
        <div className="relative group">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-500/30 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="font-medium">Déconnexion</span>
            )}
          </button>

          {/* Tooltip pour logout en mode collapsed */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-600 shadow-lg z-50">
              Déconnexion
            </div>
          )}
        </div>
      </nav>

      {/* User Info (si pas collapsed) */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Administrateur</p>
                <p className="text-xs text-slate-400 truncate">admin@agence.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      <div className="absolute top-20 left-4 w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full"></div>
    </div>
  );
};

export default Sidebar;