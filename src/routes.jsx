import { Navigate, useRoutes } from 'react-router-dom';
import Middleware from './middleware';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// Not Auth
import Login from './pages/Login';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------
import DashboardApp from './pages/DashboardApp';

export default function Router() {
    return useRoutes([
        {
            path: "login",
            element: (
                // <Middleware.Before>
                    <Login />
                // </Middleware.Before>
            ),
        },
        {
            path: "/dashboard",
            element: (
                // <Middleware.After>
                    <DashboardLayout />
                // </Middleware.After>
            ),
            children: [{ path: "", element: <DashboardApp /> }],
        },
        {
            path: "/",
            element: <LogoOnlyLayout />,
            children: [
                { path: "/", element: <Navigate to="/login" /> },
                { path: "404", element: <NotFound /> },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />,
        },
    ]);
}
