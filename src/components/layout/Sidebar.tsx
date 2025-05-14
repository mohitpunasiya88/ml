import { NavLink } from 'react-router-dom';
import { Home, FolderPlus, FolderSync, CheckCircle, FileCheck, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <Home size={18} />,
    },
    {
      label: 'New Projects',
      path: '/projects/new',
      icon: <FolderPlus size={18} />,
    },
    {
      label: 'Sent to CEO',
      path: '/projects/sent-to-ceo',
      icon: <FolderSync size={18} />,
    },
    {
      label: 'Approved by Client',
      path: '/projects/approved-by-client',
      icon: <CheckCircle size={18} />,
    },
    {
      label: 'Invoice Raised',
      path: '/projects/invoice-raised',
      icon: <FileCheck size={18} />,
    },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-purple-600 p-1.5">
            <FolderSync size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">ML Projects</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 mt-6">
        <div className="p-3 bg-gray-50 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <User size={16} className="text-purple-600" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-3 w-full flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;