import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../templates/PrimaryButton';

const LogInPage: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSignUpClick = () => {
        window.Login.UserSignUp({ username, email, password });
    };

    return (
        <div className='flex justify-center flex-col gap-3 py-7 px-7'>
            <h1 className='text-center text-3xl -mt-2 mb-3'>Sign Up</h1>
            <input
                type='text'
                placeholder='Username..'
                className='py-1 px-2 text-black'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='text'
                placeholder='Email..'
                className='py-1 px-2 text-black'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password..'
                className='py-1 px-2 text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type='password'
                placeholder='Confirm password..'
                className='py-1 px-2 text-black'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <PrimaryButton
                name='Sign Up'
                onClick={handleSignUpClick}
                disabled={!username || !password || password !== confirmPassword}
                addedClasses='disabled:bg-orange-200'
            />
            <PrimaryButton name='Already have an account? Log In' onClick={() => navigate('/')} />
        </div>
    );
};

export default LogInPage;
