/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';

// Pages
import AppBar from './assets/components/AppBar';
import MainAppPage from './assets/components/pages/MainAppPage';

const AppLayout: React.FC = () => {
    return (
        <div className='App'>
            <AppBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

const router = createMemoryRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <MainAppPage />
            }
        ]
    }
]);

const App: React.FC = () => {
    return (
        <div className='flex flex-col h-screen select-none bg-zinc-800 text-zinc-300'>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
