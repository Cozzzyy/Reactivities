import { Navigate, Outlet, useLocation } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount.ts';

export default function RequireAuth() {
    const { currentUser } = useAccount();
    const location = useLocation();

    // No loading state because the user query is disabled until after login.
    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}