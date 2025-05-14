import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();

  // Update title based on current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      setTitle('Dashboard');
    } else if (path.includes('/projects/new')) {
      setTitle('New Projects');
    } else if (path.includes('/projects/sent-to-ceo')) {
      setTitle('Projects Sent to CEO');
    } else if (path.includes('/projects/approved-by-client')) {
      setTitle('Projects Approved by Client');
    } else if (path.includes('/projects/invoice-raised')) {
      setTitle('Projects with Invoice Raised');
    } else if (path.includes('/projects/create')) {
      setTitle('Create New Project');
    } else if (path.includes('/projects/') && path.split('/').length === 3) {
      setTitle('Project Details');
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {children}
            <h1 className="ml-2 text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {!location.pathname.includes('/projects/create') && (
              <Link to="/projects/create" className="btn btn-primary">
                <PlusCircle size={18} className="mr-2" />
                New Project
              </Link>
            )}
            
            <div className="flex items-center">
              <span className="hidden md:block text-sm font-medium text-gray-700 mr-2">
                Welcome, {user?.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;