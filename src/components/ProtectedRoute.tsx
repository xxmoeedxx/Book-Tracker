import { Navigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth(); 
  if (loading) {
    // Show a loading spinner or placeholder while user state is being resolved
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
