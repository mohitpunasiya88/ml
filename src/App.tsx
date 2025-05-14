import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
        <Toaster position="top-right" />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;