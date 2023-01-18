import React, { useEffect } from 'react';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Pages
import AppBar from './assets/components/AppBar';
import ForgotPasswordPage from './assets/components/pages/ForgotPasswordPage';
import LogInPage from './assets/components/pages/LogInPage';
import SignUpPage from './assets/components/pages/SignUpPage';

const AppLayout: React.FC = () => {
    useEffect(() => {
        window.Login.on('user:login', (data: { message: string }) => {
            if (data.message === 'Failed') {
                toast.error('Unable to log in. Username does not exist or password is incorrect.', {
                    toastId: 'login',
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored'
                });
            }
        });
    }, []);

    return (
        <div className='App'>
            <AppBar />
            <ToastContainer
                className='top-9'
                position='top-center'
                transition={Slide}
                autoClose={3000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
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
                element: <LogInPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage />
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
