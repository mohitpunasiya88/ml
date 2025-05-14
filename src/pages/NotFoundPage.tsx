import { Link } from 'react-router-dom';
import { FolderX } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="rounded-full bg-red-100 p-6 mb-6">
        <FolderX size={48} className="text-red-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 text-center">404 - Page Not Found</h1>
      <p className="mt-4 text-xl text-gray-600 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 btn btn-primary px-6 py-3 text-base"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;