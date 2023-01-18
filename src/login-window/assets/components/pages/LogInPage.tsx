import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../templates/PrimaryButton';

const LogInPage: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.Login.UserLogIn({ username, password });
    };

    return (
        <form onSubmit={(e) => handleOnSubmit(e)} className='flex justify-center flex-col gap-3 py-11 px-7'>
            <h1 className='text-center text-3xl -mt-2 mb-3'>Log In</h1>
            <input
                type='text'
                placeholder='Username..'
                className='py-1 px-2 text-black'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password..'
                className='py-1 px-2 text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton
                name='Log In'
                type='submit'
                disabled={!username || !password}
                addedClasses='disabled:bg-orange-200'
            />
            <PrimaryButton name='Forgot password?' onClick={() => navigate('/forgot-password')} />
            <PrimaryButton name="Don't have an account? Sign up" onClick={() => navigate('/signup')} />
        </form>
    );
};

export default LogInPage;
