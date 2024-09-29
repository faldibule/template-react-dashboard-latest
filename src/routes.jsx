import { Navigate, useRoutes } from 'react-router-dom';
import Middleware from './middleware';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnly from './layouts/logo-only/LogoOnly';

// Not Auth
import Login from './pages/login';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------
import DashboardApp from './pages/DashboardApp';

export default function Router() {
    return useRoutes([
        {
            path: "login",
            element: (
                // <Middleware.Before>
                    <LogoOnly footer={false} />
                // </Middleware.Before>
            ),
            children: [
                { path: "", element: <Login /> },
            ]
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
            element: <LogoOnly />,
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
